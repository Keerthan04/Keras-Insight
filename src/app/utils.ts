import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference";


const hf = new HfInference(process.env.HF_TOKEN!);
export async function queryPineconeVectorStore(
  client: Pinecone,
  indexName: string,
  query: string
): Promise<string> {
  const apiOutput = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: query,
  });
  console.log("api output is \n",apiOutput);

  const queryEmbedding = Array.from(apiOutput);
  // console.log("Querying database vector store...");
  const index = client.Index(indexName);
  const queryResponse = await index.query({
    topK: 3,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vector: queryEmbedding as any,
    includeMetadata: true,
    // includeValues: true,
    includeValues: false,
  });

  console.log("query response is \n",queryResponse);

  if (queryResponse.matches.length > 0) {
    const concatenatedRetrievals = queryResponse.matches
      .map(
        (match, index) =>
          `\nDocument Finding ${index + 1}: \n ${match.metadata?.text}`
      )
      .join(". \n\n");
    return concatenatedRetrievals;
  } else {
    return "<nomatches>";
  }
  return "";
}
