import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights in the database", () => {
    withDB((fixture) => {
        let result: Insight | undefined;

        beforeAll(() => {
            fixture.insights.insert([
                { brand: 1, createdAt: new Date().toISOString(), text: "Test insight text" },
                { brand: 2, createdAt: new Date().toISOString(), text: "Test insight text 2" },
            ]);
            result = deleteInsight({
                db: fixture.db,
                id: 1,
            });
        });

        it("deletes the insight from the database", () => {
            const allInsights = fixture.insights.selectAll();
            expect(allInsights.length).toBe(1);
            expect(allInsights[0].brand).toBe(2);
            expect(allInsights[0].text).toBe("Test insight text 2");
        });
    });
});
