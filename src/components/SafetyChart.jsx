"use client";
import { Card, DonutChart, Title } from "@tremor/react";
import { useMemo } from "react";

const SafetyChart = ({ data }) => {
    console.log('SafetyChart', data);
    const SafetyData = useMemo(() => {
        if (!data) return [];// Handle null or undefined data

        const violationCount = {};

        // Count violations
        data?.forEach(driver => {
            driver?.violations?.forEach(violation => {
                violationCount[violation] = (violationCount[violation] || 0) + 1;
            });
        });
        console.log('violationCount', violationCount);
        // Transform violation counts into array of objects
        return Object.entries(violationCount)?.map(([violation, count]) => ({
            violation,
            count,
        }));
    }, [data]);

    const averageScore = useMemo(() => {
        if (!data) return 0;// Handle null or undefined data

        // Calculate total safety score and average score
        const totalScore = data?.reduce((total, item) => {
            return total + item?.total_safety_score;
        }, 0);

        return (totalScore / data?.length)?.toFixed(2);
    }, [data]);

    return (
        <Card className="w-full md:max-h-60 h-full ">
            <Title className="text-center">Safety Scores</Title>
            <DonutChart
                className="text-4xl"
                data={SafetyData}
                category="count"
                index="violation"
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                showAnimation={true}
                noDataText='Safety Score is unavailable'
                label={averageScore}
                onValueChange={(v) => console.log('v', v)}

            />
        </Card>
    );
}

export default SafetyChart;