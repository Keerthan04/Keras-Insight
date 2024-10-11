# Keras-Insight

Keras-Insight is a project that combines a Next.js frontend with a Flask backend to create a powerful RAG (Retrieval-Augmented Generation) system for the Keras documentation. It uses a vector store for efficient retrieval and Ollama with the Llama 2 model for generation.

## Project Status

**Note: This project is still in progress and actively being improved.**

## Features

- Next.js frontend for a responsive and interactive user interface
- Flask backend for handling API requests and business logic
- RAG system utilizing the entire Keras documentation
- Vector store for efficient information retrieval
- Local Ollama integration with Llama 2 model for text generation
- Hugging Face integration for additional NLP capabilities

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Python 3.7+ installed
- Ollama installed (https://ollama.ai/)
- Hugging Face CLI installed and configured

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/keras-insight.git
   cd keras-insight
   ```

2. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

3. Set up the backend:
   ```
   cd ../backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

4. Install and pull the Llama 2 model for Ollama:
   ```
   ollama pull llama3.2
   ```

5. Log in to Hugging Face (if not already done):
   ```
   huggingface-cli login
   ```

## Running the Project

1. Start the Flask backend:
   ```
   cd backend/app
   flask --app route run --debug
   ```

2. In a new terminal, start the Next.js frontend:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Demo Image

![Keras-Insight Demo](images/working%20screenshot.png)

## Usage

To use Keras-Insight:

1. Once the application is running, open your web browser and navigate to `http://localhost:3000`.

2. You will see a message text area on the page. Enter your query about Keras in this text area.

3. Click the "Send Message" button to submit your query.

4. Wait for a few moments while the system processes your request. During this time:
   - The application will retrieve relevant information from the Keras documentation.
   - It will then generate a response using the Llama 2 model.

5. The generated response will appear in the output box on the page.

6. To see detailed information about the process:
   - Open the browser's developer tools (usually F12 or right-click and select "Inspect").
   - Go to the Console tab to view logs about the request and response process.
   - In your code editor, check the terminal where you're running the backend to see server-side logs.

These logs can provide insights into how the RAG system is working, including the retrieval process and the generation of the response.

Note: The response time may vary depending on the complexity of the query and the current load on the system.
