from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper.scraper import WebScraper
from vectorStore.vectorstore import VectorStore
from llm.llm import LLMResponse
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama
import os
import json
from langchain_community.embeddings import HuggingFaceEmbeddings
from envconfig import PINECONE_API_KEY,LANGCHAIN_API_KEY,INDEX_NAME
from vectorStore.pinecone import PineconeManager
from vectorStore.pinecone_retriever import PineconeStorage

app = Flask(__name__)
# CORS(app)

@app.route("/")
def index():
    return "Hello, World!"


@app.route("/chat",methods = ['POST'])
async def chat():
    """
    This endpoint is used to generate a code snippet based on a user query and context from the Keras documentation.

    The endpoint takes in a POST request with a query parameter that contains the user's query.

    The endpoint works by first walking through the directory tree of the Keras documentation to find all relevant HTML files. The HTML files are then scraped for relevant information using the WebScraper class. The scraped information is then used to create a vector store, which is a data structure that is used to store and search through the scraped information. The vector store is then used to find relevant context from the Keras documentation that matches the user's query. The relevant context is then fed into an LLMResponse object, which is responsible for generating code based on the user's query and context. The generated code is then returned to the user as a JSON response.

    :param message: The user's query.
    :return: The generated code snippet as a JSON response.
    """
    print("Flask Backend Entry \n")
    data = request.get_json()  # Get JSON data from the request
    message = data.get('message')
    print("message in flask backend is \n",message)
    
    # dir_to_work_with = r'C:\Users\User\OneDrive\Desktop\dl document loader\keras website\keras.io\api'
    # index_name = "keras_docs_index"

    print("Pinecone Initialization \n")
    pinecone_manager = PineconeManager(PINECONE_API_KEY, INDEX_NAME)
    pinecone_manager.initialize_index()
    print("Pinecone initialization done \n")
    
    print("reached the flask backend and started \n")
    local_llm = 'llama3.2'
    llm = ChatOllama(model=local_llm, temperature=0)
    llm_json_mode = ChatOllama(model=local_llm, temperature=0, format='json')
    
    llm_responder = LLMResponse(llm=llm)
    scraper = WebScraper()
    print("initialized the llm and scraper \n")
    
    #TODO
    #try with ollama embedding and also the other embedding and also only once embed and keep in pinecone and then doing
    
    # embed = OllamaEmbeddings(
    #     model="llama3.2"
    # )
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    print("embedding initialized \n")
    
    # html_files = []
    # for root, dirs, files in os.walk(dir_to_work_with):
    #     for file in files:
    #         if file.endswith(".html"):
    #             html_files.append(os.path.join(root, file))
    # print("the html files got from directory and embedding initialized\n")
    
    # print("document scrape started")
    # documents = await scraper.scrape_files(file_paths=html_files)
    # print("documents scrape done \n")
    
    print("vector store creating and about to retrieve \n")
    # vector_store =VectorStore(embedding=embeddings,documents=documents)
    # vector_store_retriever = vector_store.create_vector_store(index_name=index_name)
    # context_string = vector_store.give_context(retriever=vector_store_retriever,question=message)
    
    Vector_store = PineconeStorage(embedding=embeddings)
    vector_store_retriever = Vector_store.create_vector_store(index=pinecone_manager.index)
    context_string = Vector_store.give_context(retriever=vector_store_retriever,question=message)
    print("context string got and retriever done \n")
    
    print("generating the content from llm\n")
    
    #TODO
    #try the llm part with the google api
    #try combi google(normal and finetuned) with pinecone and other and also ollama with pine cone and other
    
    generation_content = llm_responder.generate_response(question=message,context=context_string)
    print("generation done returning \n")
    
    return jsonify({"generation": generation_content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    
    
    
# TODO
'''
1. use of pinecone and good embedders for persistant storage so as to no index storing again
2. integration of other scorers(relevance) and all in backend and then showing in frontend by removing the things of sending messages and all
3. diff parameters input to be taken and diff models integration and usage to be shown
4. google and my finetuned model usage and then doing here
5. if ollama or other then deploying options and also both together deploy options to be seen
6. the langraph type and extra like router for websearch and other to be seen
7. if and error then shd do propely
8. once message send complete reload so all the model info and all gone again
9. the embedding and scaping all do and keep it in the pinecone so then direct to ask from that and answer got
10. the ability to provide the history and also if we can do that
11. answer and other metrics that shd be learnt and done


12. make the landing page and when that is there the pinecone and all initialized already something so that no time for initializing and all of that and similar to others also
'''