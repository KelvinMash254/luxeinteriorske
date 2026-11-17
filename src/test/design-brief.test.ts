import { describe, expect, it } from "vitest";
import { briefInputSchema, briefToText, extractOutputText, parseBrief, type DesignBrief } from "@/lib/design-brief";

const sample: DesignBrief = {
  title: "Apartment living room",
  summary: "A calmer, brighter living room for entertaining.",
  project_type: "Residential",
  spaces: ["Living room"],
  style_direction: ["Deep greens", "Brass accents"],
  priorities: ["More light"],
  constraints: [],
  budget_and_timeline: "Not specified yet",
  suggested_services: ["Residential Interior Design", "Made-up Service"],
  questions_to_discuss: ["What is the budget?"],
};

describe("design brief rules", () => {
  it("rejects notes shorter than 20 characters", () => {
    expect(briefInputSchema.safeParse({ notes: "too short" }).success).toBe(false);
  });

  it("rejects notes longer than 3000 characters", () => {
    expect(briefInputSchema.safeParse({ notes: "a".repeat(3001) }).success).toBe(false);
  });

  it("drops suggested services that Luxe Interiors Ke does not offer", () => {
    const brief = parseBrief(JSON.stringify(sample));
    expect(brief?.suggested_services).toEqual(["Residential Interior Design"]);
  });

  it("returns null when the model output is not a valid brief", () => {
    expect(parseBrief("not json")).toBeNull();
    expect(parseBrief(JSON.stringify({ title: "x" }))).toBeNull();
  });

  it("reads the assistant text from a Responses result", () => {
    const text = extractOutputText({
      output: [
        { type: "reasoning", content: [] },
        { type: "message", content: [{ type: "output_text", text: '{"a":' }, { type: "output_text", text: "1}" }] },
      ],
    });
    expect(text).toBe('{"a":1}');
  });

  it("keeps the consultation prefill within the 3000-character description limit", () => {
    const long = { ...sample, summary: "x".repeat(5000) };
    expect(briefToText(long).length).toBeLessThanOrEqual(3000);
  });
});
