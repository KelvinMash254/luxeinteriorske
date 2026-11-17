import { createServerFn } from "@tanstack/react-start";
import { generateResponse, GatewayError, PaymentRequiredError, RateLimitError } from "@lovable.dev/ai-gateway";
import {
  BRIEF_INSTRUCTIONS,
  DESIGN_BRIEF_JSON_SCHEMA,
  briefInputSchema,
  buildBriefPrompt,
  extractOutputText,
  parseBrief,
  type DesignBrief,
} from "./design-brief";

export type BriefResult = { ok: true; brief: DesignBrief } | { ok: false; error: string };

export const createDesignBrief = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => briefInputSchema.parse(input))
  .handler(async ({ data }): Promise<BriefResult> => {
    try {
      const response = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: BRIEF_INSTRUCTIONS,
        input: buildBriefPrompt(data),
        max_output_tokens: 2000,
        reasoning: { effort: "low" },
        text: {
          format: {
            type: "json_schema",
            name: "design_brief",
            strict: true,
            schema: DESIGN_BRIEF_JSON_SCHEMA as unknown as Record<string, unknown>,
          },
        },
      });
      const brief = parseBrief(extractOutputText(response));
      if (!brief) {
        console.error("Design brief: model returned an unexpected format");
        return { ok: false, error: "We couldn't shape your notes into a brief this time. Please try again." };
      }
      return { ok: true, brief };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error("Design brief gateway error", error.code, error.httpStatus, error.ids);
        if (error instanceof RateLimitError) {
          return { ok: false, error: "The brief assistant is busy right now. Please wait a moment and try again." };
        }
        if (error instanceof PaymentRequiredError) {
          return { ok: false, error: "The brief assistant is temporarily unavailable. You can still send your notes directly below." };
        }
        return { ok: false, error: "The brief assistant couldn't respond. Please try again shortly." };
      }
      console.error("Design brief failed", error);
      return { ok: false, error: "Something went wrong while creating your brief. Please try again." };
    }
  });
