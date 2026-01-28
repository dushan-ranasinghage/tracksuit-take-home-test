import type { Insight } from "../models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "../tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): Insight | undefined => {
  console.log(`Deleting insight for id=${input.id}`);

  const selectParams: insightsTable.SelectById = { id: input.id };
  const [row] = input.db
    .sql<
      insightsTable.Row
    >`SELECT * FROM insights WHERE id = ${selectParams.id} LIMIT 1`;

  if (!row) {
    console.log("Insight not found");
    return;
  }

  input.db.exec(insightsTable.deleteStatement({ id: input.id }));

  const result: Insight = {
    id: row.id,
    brand: row.brand,
    createdAt: new Date(row.createdAt),
    text: row.text,
  };

  console.log("Insight deleted successfully:", result);
  return result;
};
