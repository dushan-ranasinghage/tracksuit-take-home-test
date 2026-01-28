import React, { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import { transformServerInsights } from "../lib/transform.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const fetchInsights = async () => {
    try {
      const res = await fetch(`/api/insights`);
      const data = await res.json();

      // Transform server data to match client view models
      const transformedData = transformServerInsights(data);

      setInsights(transformedData);
    } catch (err) {
      console.error("Failed to fetch insights:", err);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header onInsightAdded={fetchInsights} />
      <Insights className={styles.insights} insights={insights} onInsightDeleted={fetchInsights} />
    </main>
  );
};
