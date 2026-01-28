import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  withDB((fixture) => {
    let result: Insight;

    beforeAll(() => {
      result = createInsight({
        db: fixture.db,
        brand: 1,
        text: "Test insight text",
      });
    });

    it("returns an insight with correct properties", () => {
      expect(result.brand).toBe(1);
      expect(result.text).toBe("Test insight text");
      expect(result.id).toBeGreaterThan(0);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("saves the insight to the database", () => {
      const allInsights = fixture.insights.selectAll();
      expect(allInsights.length).toBe(1);
      expect(allInsights[0].brand).toBe(1);
      expect(allInsights[0].text).toBe("Test insight text");
    });
  });

  describe("creating multiple insights", () => {
    withDB((fixture) => {
      let result: Insight[];

      beforeAll(() => {
        result = [
          createInsight({ db: fixture.db, brand: 1, text: "Test insight text" }),
          createInsight({ db: fixture.db, brand: 2, text: "Test insight text 2" }),
        ];
      });

      it("saves the insights to the database in the correct order", () => {
        const allInsights = fixture.insights.selectAll();
        expect(allInsights[0].brand).toBe(1);
        expect(allInsights[0].text).toBe("Test insight text");
        expect(allInsights[1].brand).toBe(2);
        expect(allInsights[1].text).toBe("Test insight text 2");
      });
    });
  });
});
