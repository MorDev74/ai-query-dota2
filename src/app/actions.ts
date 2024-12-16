"use server"

import { Result } from "@/utils/types";

export function generateChartConfig(results: Result[]) {
    const chartConfig = {
        type: "bar",
        data: {
            labels: results.map((result) => result.name),
            datasets: [
                {
                    label: "Total Time",
                    data: results.map((result) => result.totalTime),
                    backgroundColor: "#007bff",
                },
            ],
        },
        options: {
            scales: {
               y: {}
            }
        }
    }
    return chartConfig;
}