import os
import httpx
import logging
import time
from datetime import datetime
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models import GeminiKey, AgentLog
from app.core.security import KeyEncryption

logger = logging.getLogger(__name__)


class GeminiAgentService:
    """
    Enterprise-grade Admin AI Agent service powered by Gemini.
    Supports rotating up to 10 dynamic Gemini API keys (from DB & Env).
    Implements 10 advanced core administrative agent capabilities/tools.
    """

    @staticmethod
    def get_active_keys(db: Session) -> List[str]:
        """
        Gathers active decrypted Gemini API keys from both Database and Environment Variables (up to 10 keys).
        """
        keys = []

        # 1. Fetch from Database
        db_keys = db.query(GeminiKey).filter(GeminiKey.is_active == True).order_by(GeminiKey.used_count.asc()).all()
        for dk in db_keys:
            if dk.key_value:
                # Decrypt the encrypted key from DB
                plain_key = KeyEncryption.decrypt(dk.key_value)
                if plain_key and plain_key != "DECRYPTION_FAILED" and plain_key not in keys:
                    keys.append(plain_key)

        # 2. Fetch from Environment variables (GEMINI_API_KEY_1 to GEMINI_API_KEY_10)
        for i in range(1, 11):
            env_key = os.getenv(f"GEMINI_API_KEY_{i}") or os.getenv("GEMINI_API_KEY") if i == 1 else None
            if env_key and env_key not in keys:
                keys.append(env_key)

        # Limit to 10 keys maximum
        return keys[:10]

    @staticmethod
    def increment_key_usage(db: Session, key_value: str):
        """Increments the usage count of a key in the database if it exists"""
        try:
            # Find key by encrypted match or encrypt it first
            enc_key = KeyEncryption.encrypt(key_value)
            db_key = db.query(GeminiKey).filter(GeminiKey.key_value == enc_key).first()
            if not db_key:
                # Fallback to scanning decrypt matches (safe and secure)
                all_keys = db.query(GeminiKey).all()
                for k in all_keys:
                    if KeyEncryption.decrypt(k.key_value) == key_value:
                        db_key = k
                        break

            if db_key:
                db_key.used_count += 1
                db.commit()
        except Exception as e:
            logger.error(f"Failed to increment key usage: {str(e)}")
            db.rollback()

    @staticmethod
    def call_gemini_api(db: Session, prompt: str, system_instruction: str = "") -> str:
        """
        Calls the Gemini API with key rotation across up to 10 keys.
        If a key fails, it immediately rotates to the next key.
        """
        keys = GeminiAgentService.get_active_keys(db)
        if not keys:
            raise ValueError("No active Gemini API keys configured. Please add keys in the Admin Panel or configure GEMINI_API_KEY environment variables.")

        last_error = ""
        for key in keys:
            try:
                # Prepare payload for Gemini 1.5 Flash (standard robust multimodal model)
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"

                payload = {
                    "contents": [
                        {
                            "parts": [
                                {"text": prompt}
                            ]
                        }
                    ]
                }

                if system_instruction:
                    payload["systemInstruction"] = {
                        "parts": [
                            {"text": system_instruction}
                        ]
                    }

                headers = {"Content-Type": "application/json"}

                # Make HTTP POST request with 30s timeout
                with httpx.Client() as client:
                    response = client.post(url, json=payload, headers=headers, timeout=30.0)

                    if response.status_code == 200:
                        data = response.json()
                        text_response = data["candidates"][0]["content"]["parts"][0]["text"]

                        # Increment key usage on success
                        GeminiAgentService.increment_key_usage(db, key)
                        return text_response
                    else:
                        error_detail = response.text
                        logger.warning(f"Gemini API error with key: Status {response.status_code}")
                        last_error = f"Status {response.status_code}: {error_detail}"
            except Exception as e:
                logger.warning(f"Network error with key: {str(e)}")
                last_error = str(e)

        raise RuntimeError(f"All configured Gemini API keys failed. Last error: {last_error}")

    @staticmethod
    def execute_tool(db: Session, tool_name: str, prompt_input: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Executes one of the 10 core administrative capabilities.
        Instruments logs and tracks metrics.
        """
        start_time = time.time()
        status = "Success"
        error_msg = None
        result = ""

        # Define the system instructions and custom formatting prompt for each capability
        system_instructions = {
            "translate": (
                "You are an expert multilingual translator supporting over 60 languages.\n"
                "Translate the input text into the target language specified in the context.\n"
                "Strictly preserve formatting, HTML tags, markdown structure, and variables.\n"
                "If the target language is Right-to-Left (RTL) such as Persian (فارسی) or Arabic (العربية), "
                "ensure appropriate text alignment rules, phrasing, and cultural context are fully preserved."
            ),
            "generate_article": (
                "You are a professional technical content writer and senior AI engineer.\n"
                "Draft a highly detailed, production-grade technical blog post based on the requested topic.\n"
                "Return a structured draft containing: Title, Table of Contents, Excerpt (1-2 sentences), "
                "Estimated Reading Time (minutes), SEO Title, SEO Meta Description, and highly detailed markdown Content."
            ),
            "analyze_sentiment": (
                "You are a communications specialist and customer support lead.\n"
                "Analyze the incoming contact form message.\n"
                "Classify its sentiment: 'Positive', 'Inquiry', 'Spam', or 'Urgent'.\n"
                "Draft a premium, custom, context-aware reply email addressed to the sender, "
                "matching the sender's language (e.g. English, Persian, Arabic, German, etc.) and tone."
            ),
            "seo_optimizer": (
                "You are a world-class SEO strategist and technical auditor.\n"
                "Optimize the provided content for perfect 100/100 Lighthouse SEO score.\n"
                "Return: \n"
                "1. Optimized Meta Title and Meta Description (observing character length limits).\n"
                "2. OpenGraph and Twitter Card tags.\n"
                "3. JSON-LD structured data for search engine rich snippets.\n"
                "4. Image SEO recommendations (alt text suggestions)."
            ),
            "categorize_content": (
                "You are an administrative content manager.\n"
                "Analyze the provided text. Categorize it into a major domain (e.g. AI Engineering, Web Development, Cloud Computing).\n"
                "Extract the top 5-10 tags, standard technologies, and keywords mentioned in the text."
            ),
            "build_curriculum": (
                "You are an academic curriculum designer and technical instructor.\n"
                "Design a complete professional course outline on the specified topic.\n"
                "Return: Course Overview, Course level (Beginner/Intermediate/Advanced), Recommended Duration, "
                "a multi-module Curriculum with specific lesson descriptions, 2 practical Hands-On Projects, "
                "and an FAQ list of 5 common student inquiries with answers."
            ),
            "research_helper": (
                "You are a principal research scientist and AI Lab manager.\n"
                "Summarize complex scientific/AI research papers, patents, or experimental code prototypes.\n"
                "Extract: Core Contributions, Methodology, Mathematical formulas/concepts simplified, "
                "Practical Applications, and suggestions for an interactive demo in the 'Labs' section of the website."
            ),
            "book_summarizer": (
                "You are a literary editor and publisher.\n"
                "Given a book proposal, outline, or theme, draft: \n"
                "1. A description of a high-end visual Book Cover Concept (inspired by Apple/Minimal design).\n"
                "2. A compelling, high-converting book marketing synopsis/description.\n"
                "3. A robust, engaging introductory 'Preview Chapter' draft."
            ),
            "transcript_synthesizer": (
                "You are a technical editor for keynotes, conferences, and seminars.\n"
                "Synthesize raw notes or transcripts of talks/workshops into highly structured documentation.\n"
                "Generate: Executive Summary, Key Takeaways, structured presentation Slides outline, and a Video description with chapter timestamps."
            ),
            "dashboard_analytics": (
                "You are a chief operations and business intelligence analyst.\n"
                "Analyze the provided database statistics, visitor views, message count, and resource metrics.\n"
                "Draft a senior executive performance report with an actionable weekly roadmap for Mohammad Yasin Karami's personal platform."
            )
        }

        # Select prompt system instruction or default
        sys_inst = system_instructions.get(tool_name, "You are a helpful Senior AI Architect agent for MYK Platform.")

        # Build composite prompt with context data if present
        composite_prompt = ""
        if context:
            context_str = "\n".join([f"- {k}: {v}" for k, v in context.items()])
            composite_prompt += f"Context Parameters:\n{context_str}\n\n"

        composite_prompt += f"Instruction / Prompt Input:\n{prompt_input}"

        try:
            result = GeminiAgentService.call_gemini_api(db, composite_prompt, sys_inst)
        except Exception as e:
            status = "Failed"
            error_msg = str(e)
            result = f"Error occurred during Gemini Agent execution: {error_msg}"
            logger.error(f"Gemini Tool {tool_name} failed: {error_msg}")

        execution_time = int((time.time() - start_time) * 1000)

        # Write Agent Log to database for transparency and analytics
        try:
            log_entry = AgentLog(
                tool_used=tool_name,
                prompt=prompt_input[:1000],  # truncated to fit
                response_preview=result[:2000],  # preview response
                status=status,
                error_message=error_msg,
                execution_time_ms=execution_time
            )
            db.add(log_entry)
            db.commit()
        except Exception as log_error:
            logger.error(f"Failed to write agent log: {str(log_error)}")
            db.rollback()

        return {
            "tool_used": tool_name,
            "prompt": prompt_input,
            "result": result,
            "execution_time_ms": execution_time,
            "status": status,
            "error_message": error_msg,
            "timestamp": datetime.utcnow()
        }
