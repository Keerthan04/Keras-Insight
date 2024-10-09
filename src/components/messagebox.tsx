import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Markdown from "./markdown";

type Props = {
  role: string;
  content: string;
};

const MessageBox = ({ role, content }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm">
        {/* {content} */}
        <Markdown text={content} />
      </CardContent>
      {role !== "user" && (
        <CardFooter className="border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
          Disclaimer: The information provided by this application is based on
          Keras documentation and is intended for educational purposes only. It
          should not be considered as official guidance or a substitute for
          professional advice. Always refer to the official Keras documentation
          or consult with experts for critical implementation details.
        </CardFooter>
      )}
    </Card>
  );
};

export default MessageBox;
