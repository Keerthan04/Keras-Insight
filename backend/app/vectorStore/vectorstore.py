import os
from langchain_ollama import OllamaEmbeddings
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS
from langchain_core.vectorstores.base import VectorStoreRetriever
from langchain_community.embeddings import HuggingFaceEmbeddings
class VectorStore:
    def __init__(self,embedding:HuggingFaceEmbeddings,documents:list[Document])->None:
        """
        Initialize a VectorStore with an embedding and list of documents.

        :param embedding: The HuggingFaceEmbeddings to use for vectorization.
        :param documents: The list of Document objects to store in the vector store.
        """
        self.embedding = embedding
        self.documents = documents
    def create_vector_store(self,index_name:str)->VectorStoreRetriever:
        """
        Create a vector store and retriever from the documents in the
        current vector store.

        :param index_name: The name of the index to save the vector store
            as. The index will be saved as {index_name}.faiss.
        :return: A VectorStoreRetriever.
        """
        if os.path.exists(f"{index_name}.faiss"):
            print("Loading existing FAISS index...")
            vectorstore = FAISS.load_local(index_name, self.embeddings)
            vectorstore.add_documents(self.documents)
        else:
            print("Creating new FAISS index...")
            vectorstore = FAISS.from_documents(self.documents, self.embedding)

        vectorstore.save_local(index_name)

        retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

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