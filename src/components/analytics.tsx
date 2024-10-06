"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  question: string;
  answer: string;
  context:string;
}

interface AnalyticsData {
    response:{
        answerRelevance: { score: number; reasoning: string };
        groundedness: { score: number; reasoning: string };
    }
}

const Analytics = ({ question, answer,context }: Props) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer,context }),
      });

      const data: AnalyticsData = await response.json();
      console.log("answer got in the analytics is: \n",data);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [question, answer,context]);

  const ScoreCard = ({
    title,
    description,
    score,
    reasoning,
  }: {
    title: string;
    description: string;
    score?: number;
    reasoning?: string;
  }) => (
    <Card className=" overflow-scroll">
      <CardHeader>
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {score !== undefined ? (
          <>
            <p className="text-sm font-bold">Score: {score}</p>
            <p className="text-sm">Reasoning: {reasoning}</p>
          </>
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-7 gap-5">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="text-md font-semibold">
            Context Retrieved
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            The top 3 chunks that were retrieved to answer the question:
          </p>
        </CardHeader>
        <CardContent>
          <Textarea className="h-40 resize-none" value={context} readOnly />
        </CardContent>
      </Card>

      <div className="col-span-2">
        <ScoreCard
          title="Answer Relevance"
          description="Relevance of the answer to the question:"
          score={analyticsData?.response?.answerRelevance?.score}
          reasoning={analyticsData?.response?.answerRelevance?.reasoning}
        />
      </div>

      <div className="col-span-2">
        <ScoreCard
          title="Groundedness"
          description="Relevance of the answer to the context retrieved:"
          score={analyticsData?.response?.groundedness?.score}
          reasoning={analyticsData?.response?.groundedness?.reasoning}
        />
      </div>
    </div>
  );
};

export default Analytics;
