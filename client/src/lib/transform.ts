import type { Insight } from "../schemas/insight.ts";

type ServerInsight = {
  id: number;
  brand: number;
  createdAt: string | Date;
  text: string;
};

// Transforms server insight data to match client view models
export const transformServerInsight = (serverInsight: ServerInsight): Insight => {
  const date = new Date(serverInsight.createdAt as string);
  return {
    ...serverInsight,
    brandId: serverInsight.brand,
    date: date,
  };
};

// Transforms an array of server insights to client insights
export const transformServerInsights = (serverInsights: ServerInsight[]): Insight[] => {
  return serverInsights.map(transformServerInsight);
};
