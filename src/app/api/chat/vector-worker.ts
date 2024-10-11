// vector-worker.ts
import { PineconeStore } from "@langchain/pinecone";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

self.onmessage = async (e) => {
  const { question, pineconeIndex } = e.data;

  try {
    const EmbeddingModel = new HuggingFaceTransformersEmbeddings({
      model: "Xenova/all-MiniLM-L6-v2",
    });

    const vectorStore = await PineconeStore.fromExistingIndex(EmbeddingModel, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    const retriever = vectorStore.asRetriever({
      searchType: "mmr",
      k: 3,
    });

    const docs = await retriever.invoke(question);
    const context = docs
      .map((doc, index) => `Document ${index + 1}:\n${doc.pageContent}`)
      .join("\n\n");

    self.postMessage({ context });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
