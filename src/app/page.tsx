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
import { Search, Book, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  // const [searchQuery, setSearchQuery] = useState("");

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

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask anything about Keras..."
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#D00000] placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="absolute right-2 bg-[#D00000] hover:bg-[#b00000] text-white"
              size="sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div> */}

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

/*
TODO
1.the analytics part if required shd be done(context shown for each question however so only the results showing is enough)
2.a landing page and login if we can 
3. the playground page some changes of removing some info and linking the topk models temperature fields
4.the backend and other setup now not neeeded as ai sdk is used but if toasts and all to be made
5. clean up of code those are not required
6.possibility of a db required? for what to be seen
7. the rag prompt to be made even better like if no answer then telling as no answer and all of that to be made proper
8. the playground adding chatcomponent for smaller screens and clean up of things those are not required
9. the backend to be made still better using diff embedder like we can use diff embedder and create a vector store and then use it and do
10. also the answer is not coming good like try to add diff things to it and then also add it to embedd and do 
11. landing page done see if clerk we can add
*/

/*
TODO
2 main things are there VVIP
1. one is using flask as a backend and then using and getting info so better retriever because of langraph and analytics also we are able to do 

2. another one is directly using the nextjs backend and then getting answers currently this is doing the query retrieval like using vectors and hf model used and then using query not giving good results so improvements to be done are
   i. diff embedding models like google use the one that we have in the notebook and doing nomic for this and then storing can be done and then do the things
   ii. see if we can make for the our model of v2 something and pass it to pinecone using some webpacker,transformers library and then do like using that and doing where normal nextjs backend we can else the normal of query and then doing of queryvector using utils file and doing some improvements we can do we will see


better is using nextjs ka only make the scraping more on diff folders and all and then have the info and also some extra info also we can have so that easy scraping wecan have and also
better embedding to do and store int the vector store and then doing and also see how the analytics we can do and also the ui part of chat thodo improve to do

using the gemini and deploying try it and check for the local llama model how to do and using it


## THE BASIC WORKING IS DONE NOW OF THE NORMAL PROJECT DONE NEED THE ANALYSIS PART INSTEAD DO LIKE SCRAPE AND ASKING
so given the urls it shd scrape and then create a vector store for that and then answer it so should do something like that
*/