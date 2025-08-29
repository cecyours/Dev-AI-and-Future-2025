from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from pydantic import BaseModel

# Initialize the chatbot pipeline with a pretrained model
chatbot = pipeline("text-generation", model="facebook/blenderbot-400M-distill")

# Create FastAPI app instance
app = FastAPI(
    title="Chatbot API",
    description="A FastAPI chatbot application using Transformers pretrained models",
    version="1.0.0"
)

# Add CORS middleware to allow all ports from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for chat input
class ChatRequest(BaseModel):
    message: str

# Response model for chat output
class ChatResponse(BaseModel):
    response: str
# POST endpoint for chatbot
@app.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    """
    Chat with the bot by sending a message and receiving a response.
    """
    try:
        # Generate response using the chatbot pipeline
        response = chatbot(request.message, max_length=100, num_return_sequences=1, pad_token_id=50256)
        bot_response = response[0]['generated_text']
        
        # Extract only the new generated text (remove the input message)
        if bot_response.startswith(request.message):
            bot_response = bot_response[len(request.message):].strip()
        
        return ChatResponse(response=bot_response)
    except Exception as e:
        return ChatResponse(response=f"Sorry, I encountered an error: {str(e)}")
