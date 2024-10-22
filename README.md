# Keras-Insight

Keras-Insight is an innovative AI-powered tool that combines the power of RAG (Retrieval-Augmented Generation) with the extensive Keras documentation. This project aims to provide developers with quick, accurate answers to their Keras-related questions, enhancing productivity and learning in the field of deep learning.

![Keras-Insight Homepage](images/Home%20Page.png)

## Live Demo

Experience Keras-Insight in action: [https://keras-insight.vercel.app/](https://keras-insight.vercel.app/)

## Features

- **Intelligent Query Processing**: Utilizes advanced NLP techniques to understand and respond to user queries.
- **RAG System**: Leverages the entire Keras documentation for comprehensive and accurate responses.
- **Vector Store Integration**: Employs efficient information retrieval for fast and relevant results.
- **Next.js Frontend**: Offers a responsive and user-friendly interface.
- **Vercel AI SDK**: Enables smooth, streaming responses for an enhanced user experience.

## Project Architecture

![Architecture Overview](images/architecture_overview.png)

Our system architecture ensures efficient processing of queries and generation of responses:

![Architecture Flowchart](images/architecture_flowchart.png)

## Tech Stack

The project leverages the following technologies:

- **Next.js**
- **Vercel AI SDK**
- **LangChain**
- **Gemini Pro Model**
- **Pinecone Vector Store**

## Notebooks

All notebooks related to data processing, model fine-tuning, and evaluation are located in the `notebooks` folder. These notebooks document the various steps taken to develop the project, including:

- **Data Scraping and Preprocessing**: Scripts for scraping the Keras documentation and preparing the dataset.
- **Model Fine-tuning**: Notebooks detailing the fine-tuning process of the Gemini model.
- **Evaluation**: Evaluation of different models using the RAG Triad framework.

## Multi-Model Chat Implementation

A multi-model chat feature has been implemented, allowing users to select among different AI models (Gemini Pro, Gemini Fine-tuned, LLaMA, Mixtral) and compare their responses. This feature is available in the Streamlit app:

- **Live Demo**: [Streamlit Multi Model App](https://keras-insight-multichat-smqjfqynqvwczeep8tdzuw.streamlit.app/)
- **GitHub Repository**: [https://github.com/Keerthan04/Keras-Insight-MultiChat](https://github.com/Keerthan04/Keras-Insight-MultiChat)

## Extension Project: URLMind

Building upon the Keras-Insight concept, **URLMind** is an application where users can input URLs to create a custom knowledge base and chat with it.

- **Live Demo**: [https://url-mind.vercel.app/](https://url-mind.vercel.app/)
- **GitHub Repository**: [https://github.com/Keerthan04/url-mind](https://github.com/Keerthan04/URLMind)

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Keerthan04/keras-insight.git
   cd keras-insight
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up credentials**:

   To access the vector store, you'll need proper credentials. Please request access by opening an issue on the GitHub repository.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open the application**:

   Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Navigate to the playground page**:

   ![Chat Page](images/Chat%20Page.png)

2. **Enter your Keras-related question** in the input field.

3. **Submit your query** and wait for the AI-generated response:

   ![Chat Response](images/ChatResponse.png)

4. **Explore** the detailed, context-aware answers provided by Keras-Insight!

## Contributing

We welcome contributions to Keras-Insight! Whether it's bug fixes, feature additions, or documentation improvements, your input is valuable. Please feel free to submit pull requests or open issues on our GitHub repository.

## Contact

For any questions, suggestions, or collaboration inquiries, please contact:

- **GitHub**: [Keerthan04](https://github.com/Keerthan04)
- **Email**: [ckeerthankumar4@gmail.com](mailto:ckeerthankumar4@gmail.com)

## Acknowledgments

- **Keras Documentation**
- **Vercel** for hosting and Vercel AI SDK
- **Pinecone** for vector storage
- **All contributors and supporters** of this project

Thank you for your interest in Keras-Insight. I am excited to see how this tool can assist the deep learning community!
