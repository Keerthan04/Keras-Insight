// import {google} from '@ai-sdk/google'
// import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message, StreamData, streamText } from "ai";
//import { PineconeStore } from "@langchain/pinecone";
// import { Document } from "@langchain/core/documents";
//import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

import { queryPineconeVectorStore } from "@/app/utils";

export const maxDuration = 60;
// export const runtime = 'edge';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});
// const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

// const EmbeddingModel = new HuggingFaceTransformersEmbeddings({
//   model: "Xenova/all-MiniLM-L6-v2",
// });

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GEMINI_API_KEY,
});

const model = google("models/gemini-1.5-pro-latest", {
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});
export async function POST(req: Request) {
  const reqBody = await req.json();
  console.log("request body is \n", reqBody);

  const messages: Message[] = reqBody.messages;
  console.log("messages are \n", messages);
  const userQuestion = `${messages[messages.length - 1].content}`;
  // const userQuestion = messages
  //   .filter((msg) => msg.role === "user") // Keep only messages from the user
  //   .map((msg) => `${msg.content}`) // Map to their content
  //   .join("\n");
  console.log("user question is \n", userQuestion);
  console.log("creating vector store \n");
  // const vectorStore = await PineconeStore.fromExistingIndex(EmbeddingModel, {
  //   pineconeIndex,
  //   maxConcurrency: 5,
  // });
  console.log("vector store created \n");
  console.log("retriever creation started \n");
  // const retriever = vectorStore.asRetriever({
  //   searchType: "mmr",
  //   k: 3,
  // });
  console.log("retriever creation done \n");
  console.log("getting relevant documents \n");
  // const docs = await retriever.invoke(userQuestion);
  console.log("relevant docs got \n");
  // const context = "";
  // docs.map((m) => context.concat(m.pageContent));
  const context = await queryPineconeVectorStore(pinecone, 'dlprojectchecknomic',userQuestion);
  console.log("context is \n", context);

  const rag_prompt = `You are an intelligent assistant designed to provide accurate and relevant information from Keras documentation.

    Here is the retrieved context, which may contain both explanatory text and meaningful code snippets:

    ${context}

    Carefully analyze the above context, considering both the text and any provided code for clarity.

    Now, review the user's query:

    ${userQuestion}

    Generate a detailed response that accurately addresses the query using the provided context. If the context includes relevant code, incorporate it into your response. Ensure that your answer is both clear and grounded in the provided content."

    Response:
    `;

  console.log("Data started \n");
  const data = new StreamData();
  data.append({
    context: context,
  });
  console.log("result started getting \n");
  const result = await streamText({
    model: model,
    prompt: rag_prompt,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
