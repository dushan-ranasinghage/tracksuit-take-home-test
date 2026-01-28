import type { Insight } from "../models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "../tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
  createdAt?: Date;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}`);

  const createdAt = input.createdAt || new Date();
  const createdAtString = createdAt.toISOString();

  input.db.exec(insightsTable.insertStatement({
    brand: input.brand,
    createdAt: createdAtString,
    text: input.text,
  }));

  // Get the last inserted row ID
  const [lastInsertedRow] = input.db.sql<insightsTable.Row>`SELECT * FROM insights WHERE id = last_insert_rowid()`;

  const result: Insight = {
    id: lastInsertedRow.id,
    brand: lastInsertedRow.brand,
    createdAt: new Date(lastInsertedRow.createdAt),
    text: lastInsertedRow.text,
  };

  console.log("Insight created successfully:", result);
  return result;
};
