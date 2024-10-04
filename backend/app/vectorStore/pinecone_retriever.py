import os
from langchain_core.vectorstores.base import VectorStoreRetriever
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore

class PineconeStorage:
    def __init__(self,embedding:HuggingFaceEmbeddings)->None:
        """
        Initialize a VectorStore with an embedding.

        :param embedding: The HuggingFaceEmbeddings to use for vectorization.
        """

        self.embedding = embedding
        
    def create_vector_store(self,index)->VectorStoreRetriever:
        """
        Create a vector store and retriever from the documents in the
        current vector store.

        :param index: The name of the index to save the vector store
            as. The index will be saved as {index}.faiss.
        :return: A VectorStoreRetriever.
        """
        vector_store = PineconeVectorStore(index=index, embedding=self.embedding)
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})
        return retriever
    def give_context(self,retriever:VectorStoreRetriever,question:str)-> str:
        """
        Given a question, return a string of relevant content from the
        documents in the vector store. The content is retrieved using the
        given retriever.

        :param retriever: A VectorStoreRetriever to use for retrieving
            relevant documents.
        :param question: The question to retrieve relevant content for.
        :return: A string of content from the relevant documents.
        """
        docs = retriever.get_relevant_documents(question)
        return "\n\n".join(doc.page_content for doc in docs)