import json
from langchain.schema import SystemMessage, HumanMessage
import google.generativeai as genai
from envconfig import GEMINI_API_KEY

class GeminiResponse:
    def __init__(self,GEMINI_API_KEY:str = GEMINI_API_KEY):
        
        """
        Initializes an LLMResponse object, which is responsible for generating code based on user queries and context from the Keras documentation.

        Args:
            llm: The large language model to use for generating code. This model should be capable of understanding human instructions and generating code based on those instructions.

        The LLMResponse object is initialized with a large language model and a prompt that describes how to generate code based on user queries and context from the Keras documentation. The prompt explains that the model should analyze the context, review the user's query, and generate a detailed response that accurately addresses the query using the provided context. The response should be clear and grounded in the provided content, and should incorporate relevant code snippets from the context into the response if applicable.

        Attributes:
            llm: The large language model used to generate code.
            rag_prompt: A string that describes how to generate code based on user queries and context from the Keras documentation. The string is formatted as a docstring with a detailed description of how to generate code, and placeholders for the context and query that are filled in when the generate_response method is called.
        """
        self.api_key = GEMINI_API_KEY
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
        self.rag_prompt = """You are an intelligent assistant designed to provide accurate and relevant information from Keras documentation.

        Here is the retrieved context, which may contain both explanatory text and meaningful code snippets:

        {context}

        Carefully analyze the above context, considering both the text and any provided code for clarity.

        Now, review the user's query:

        {question}

        Generate a detailed response that accurately addresses the query using the provided context. If the context includes relevant code, incorporate it into your response. Ensure that your answer is both clear and grounded in the provided content.

        Response:
        """
    
    def generate_response(self, question:str,context:str)->str:
        '''
        Generate a response to the question based on the given context. The context is expected to contain relevant text and code snippets from the Keras documentation.
        
        Args:
            question (str): The question that needs to be answered.
            context (str): The context from the Keras documentation that should be used to answer the question.
        
        Returns:
            str: The generated response to the question based on the given context.
        '''
        rag_prompt_formatted = self.rag_prompt.format(context=context, question=question)
        print('rag format prompt \n',rag_prompt_formatted)
        response = self.model.generate_content(rag_prompt_formatted)
        print(response.text)
        return response.text