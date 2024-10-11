import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Loader2, TextSearch } from "lucide-react";
import Messages from "./messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "./markdown";

type Props = {
  reportData?: string;
};

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-gray-900 text-white relative rounded-xl gap-4 p-2 sm:p-4">
      {/* Chat Section */}
      <div className="flex-1 order-2 lg:order-1 bg-gray-800 rounded-lg p-2 sm:p-4 flex flex-col gap-4">
        <div className="flex-1 overflow-auto">
          <Messages messages={messages} isLoading={isLoading} />
        </div>

        {data?.length !== undefined && data.length > 0 && (
          <Accordion type="single" className="text-sm" collapsible>
            <AccordionItem value="item-1" className="border-gray-700">
              <AccordionTrigger>
                <span className="flex flex-row items-center gap-2">
                  <TextSearch className="text-gray-400" />
                  <span className="text-gray-200">Relevant Info</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-wrap text-gray-300">
                <Markdown
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  text={(data[data.length - 1] as any).context as string}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <form
          className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event, {
              data: {
                reportData: reportData as string,
              },
            });
          }}
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your query here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 bg-gray-800 text-white placeholder:text-gray-400"
          />
          <div className="flex items-center p-3 pt-0">
            <Button
              disabled={isLoading}
              type="submit"
              size="sm"
              className="ml-auto bg-[#D00000] hover:bg-[#B00000] text-white"
            >
              {isLoading ? "Analysing..." : "Ask Question"}
              {isLoading ? (
                <Loader2 className="ml-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <CornerDownLeft className="ml-2 h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Sidebar Section */}
      <div className="w-full lg:w-1/4 order-1 lg:order-2 flex flex-col gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3 text-white">
              How to Use the App
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#D00000] mt-0.5">✓</span>
                <span>Type your query in the text area provided.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D00000] mt-0.5">✓</span>
                <span>
                  Click on the <strong>&quot;Ask Question&quot;</strong> button
                  to get a response.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D00000] mt-0.5">✓</span>
                <span>
                  The retrieved context from the documentation will be displayed
                  in the accordion below the chat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D00000] mt-0.5">✓</span>
                <span>
                  Currently, no history of messages is being tracked, so each
                  message is independent of the others.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D00000] mt-0.5">✓</span>
                <span>
                  Refresh the page to clear the screen and start a new session.
                </span>
              </li>
            </ul>
            <h3 className="text-md font-semibold mt-4 mb-2 text-white">
              Instructions
            </h3>
            <p className="text-sm text-gray-300">
              This app helps you interact with Keras documentation using
              AI-based search and retrieval. Feel free to ask questions related
              to deep learning, machine learning, or any other concepts covered
              in Keras.
            </p>
          </CardContent>
        </Card>
        <Button
          variant="destructive"
          // className="text-[#D00000] hover:text-[#B00000] self-end"
          onClick={() =>
            window.open("https://github.com/Keerthan04/Keras-Insight", "_blank")
          }
        >
          Contribute
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
