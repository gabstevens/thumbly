import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { ThumblyBinary } from "./ThumblyBinary";
import { ThumblyStarRating } from "./ThumblyStarRating";
import { ThumblyNPS } from "./ThumblyNPS";

const mockConfig = {
  surveyId: "test-survey",
  driver: { submitVote: async () => {} },
};

describe("Accessibility Checks", () => {
  it("ThumblyBinary should have no violations", async () => {
    const { container } = render(<ThumblyBinary {...mockConfig} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ThumblyStarRating should have no violations", async () => {
    const { container } = render(<ThumblyStarRating {...mockConfig} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ThumblyNPS should have no violations", async () => {
    const { container } = render(<ThumblyNPS {...mockConfig} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
