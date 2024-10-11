'use client'
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Book, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          <span className="text-[#D00000]">Keras</span>Insight
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your AI-powered companion for exploring Keras documentation
        </p>
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader>
              <Book className="h-12 w-12 text-[#D00000] mx-auto mb-2" />
              <CardTitle>Smart Documentation Search</CardTitle>
              <CardDescription className="text-gray-400">
                Instantly find relevant information from Keras documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Get accurate answers powered by advanced RAG technology and the
                latest Keras documentation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader>
              <Cpu className="h-12 w-12 text-[#D00000] mx-auto mb-2" />
              <CardTitle>Intelligent Understanding</CardTitle>
              <CardDescription className="text-gray-400">
                Context-aware responses to your queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our AI understands the context of your questions and provides
                relevant, accurate information
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-[#D00000] mx-auto mb-2" />
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription className="text-gray-400">
                Always up-to-date with latest Keras features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Stay current with the newest Keras updates and documentation
                changes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <Button className="bg-[#D00000] hover:bg-[#b00000] text-white text-lg px-8 py-6">
            <Link href={'/playground'}>Start Exploring Keras</Link>
          </Button>
          <p className="mt-4 text-gray-400">
            No registration required. Start asking questions right away.
          </p>
        </div>
      </div>
    </div>
  );
}