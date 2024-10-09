import React from "react";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2, TextSearch } from "lucide-react";
import Messages from "./messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Markdown from "./markdown";

const ChatComponent = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="flex h-dvh flex-col lg:col-span-2 bg-muted/50 rounded-xl overflow-hidden">
      {/* Main container with fixed height and proper spacing */}
      <div className="flex flex-col h-full p-4 gap-4">
        {/* Scrollable messages container */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex-1" />
          <Messages messages={messages} isLoading={isLoading} />
        </div>

        {/* Relevant info accordion - part of scrollable area */}
        {data?.length !== undefined && data.length > 0 && (
          <Accordion type="single" className="text-sm" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="flex flex-row items-center gap-2">
                  <TextSearch /> Relevant Info
                </span>
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-wrap">
                <Markdown
                  text={(data[data.length - 1] as any).context as string}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Fixed input form at the bottom */}
        <form
          className="relative rounded-lg border bg-background mt-auto"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your Question here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button
              disabled={isLoading}
              type="submit"
              size="sm"
              className="ml-auto"
            >
              {isLoading ? "Analysing..." : "Ask Question"}
              {isLoading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <CornerDownLeft className="size-3.5" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
