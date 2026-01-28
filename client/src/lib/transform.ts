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
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

// Transforms an array of server insights to client insights
export const transformServerInsights = (serverInsights: ServerInsight[]): Insight[] => {
  return serverInsights.map(transformServerInsight);
};
