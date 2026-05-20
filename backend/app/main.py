from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, flow, responses, challenges, analytics
from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="InMind API",
    description="Backend-driven behavioural intelligence platform for student wellbeing",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(flow.router)
app.include_router(responses.router)
app.include_router(challenges.router)
app.include_router(analytics.router)


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "InMind API - Backend-driven behavioural intelligence platform",
        "version": "1.0.0",
        "environment": settings.environment,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
