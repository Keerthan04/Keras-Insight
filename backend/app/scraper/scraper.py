import os
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from typing import List, Dict
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

class WebScraper:
    def __init__(self):
        pass

    @staticmethod
    async def extract_sections(soup: BeautifulSoup) -> List[Dict[str, str]]:
        """Extract sections from a parsed HTML page.

        Sections are defined as the contents between headers (h1, h2, h3) and are
        dictionaries with keys "title", "content", and "code". The value of "title"
        is the text of the header, "content" is the text content of the section, and
        "code" is the code blocks in the section.

        :param soup: A BeautifulSoup object representing the HTML page
        :return: A list of section dictionaries
        """
        sections = []
        current_section = {"title": "Introduction", "content": "", "code": ""}

        for element in soup.find_all(['h1', 'h2', 'h3', 'p', 'pre']):
            if element.name in ['h1', 'h2', 'h3']:
                if current_section["content"] or current_section["code"]:
                    sections.append(current_section)
                current_section = {"title": element.get_text(strip=True), "content": "", "code": ""}
            elif element.name == 'p':
                current_section["content"] += element.get_text(strip=True) + "\n"
            elif element.name == 'pre':
                code = element.find('code')
                if code:
                    current_section["code"] += code.get_text(strip=True) + "\n\n"

        if current_section["content"] or current_section["code"]:
            sections.append(current_section)

        return sections

    def create_documents(self, sections: List[Dict[str, str]], file_path: str) -> List[Document]:
        """Create a list of Document objects from a list of sections and a file path.

        The content of each section is combined with its code block (if any) and
        used to create a Document object. The metadata of the Document includes
        the title of the section and the source file path.

        :param sections: A list of dictionaries with keys "title", "content", and "code"
        :param file_path: The path to the file containing the sections
        :return: A list of Document objects
        """
        documents = []
        for section in sections:
            content = section["content"]
            code = section["code"]
            combined_text = f"{content}\n\nCode:\n{code}"

            document = Document(
                page_content=combined_text,
                metadata={
                    "title": section["title"],
                    "source": file_path
                }
            )
            documents.append(document)
        
        return documents

    async def scrape_file(self, file_path: str) -> List[Document]:
        """Scrape a file and return a list of Document objects.

        The file is read and parsed with BeautifulSoup, and then the sections
        are extracted and combined into Document objects. The metadata of each
        Document includes the title of the section and the source file path.

        :param file_path: The path to the file to scrape
        :return: A list of Document objects
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                html = file.read()
                soup = BeautifulSoup(html, 'html.parser')
                sections = await self.extract_sections(soup)

                documents = self.create_documents(sections, file_path)
                return documents
        except Exception as e:
            print(f"Error scraping {file_path}: {str(e)}")
            return []

    async def scrape_files(self, file_paths: List[str]) -> List[Document]:
        """Scrape a list of files and return a list of Document objects.

        This function will scrape each file in the list in parallel using asyncio.
        The documents from each file are collected and returned as a single list.

        :param file_paths: A list of file paths to scrape
        :return: A list of Document objects
        """
        tasks = [self.scrape_file(file_path) for file_path in file_paths]
        documents_list = await asyncio.gather(*tasks)
        all_documents = [doc for sublist in documents_list for doc in sublist]
        return all_documents
