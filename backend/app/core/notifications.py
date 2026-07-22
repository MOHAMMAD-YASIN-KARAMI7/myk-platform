"""
Email notification service
Sends emails for important events
"""

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from app.core.config import settings
import logging
from typing import List, Dict, Any
from datetime import datetime

logger = logging.getLogger(__name__)


class EmailNotificationService:
    """Send email notifications"""
    
    @staticmethod
    def send_email(
        to_email: str,
        subject: str,
        html_content: str,
        plain_text: str = None
    ) -> bool:
        """Send email via SMTP"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = settings.SMTP_FROM
            msg['To'] = to_email
            
            if plain_text:
                msg.attach(MIMEText(plain_text, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))
            
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
            
            logger.info(f"✅ Email sent to {to_email}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to send email: {str(e)}")
            return False
    
    @staticmethod
    def send_new_message_notification(message_data: Dict[str, Any]) -> bool:
        """Notify admin about new contact message"""
        html_content = f"""
        <html>
            <body style="font-family: Arial; direction: rtl;">
                <h2>📬 پیام جدید</h2>
                <p><strong>نام:</strong> {message_data['name']}</p>
                <p><strong>ایمیل:</strong> {message_data['email']}</p>
                <p><strong>موضوع:</strong> {message_data['subject']}</p>
                <p><strong>پیام:</strong></p>
                <p>{message_data['content']}</p>
                <hr>
                <p style="color: gray; font-size: 12px;">
                    {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')}
                </p>
            </body>
        </html>
        """
        
        return EmailNotificationService.send_email(
            to_email=settings.SMTP_FROM,
            subject=f"📬 پیام جدید: {message_data['subject']}",
            html_content=html_content
        )
    
    @staticmethod
    def send_article_published_notification(article_data: Dict[str, Any]) -> bool:
        """Notify subscribers about new published article"""
        html_content = f"""
        <html>
            <body style="font-family: Arial;">
                <h2>📝 New Article Published</h2>
                <h3>{article_data['title']}</h3>
                <p>{article_data.get('excerpt', 'New article published')}</p>
                <a href="https://myk-platform.com/articles/{article_data['slug']}" 
                   style="background-color: #007bff; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 5px;">
                    Read Article
                </a>
            </body>
        </html>
        """
        
        return EmailNotificationService.send_email(
            to_email=settings.SMTP_FROM,
            subject=f"📝 New Article: {article_data['title']}",
            html_content=html_content
        )
    
    @staticmethod
    def send_user_welcome_email(user_data: Dict[str, Any]) -> bool:
        """Send welcome email to new user"""
        html_content = f"""
        <html>
            <body style="font-family: Arial;">
                <h2>Welcome to MYK Platform! 🎉</h2>
                <p>Hi {user_data['full_name']},</p>
                <p>Thank you for joining our platform.</p>
                <p>You can now explore projects, articles, courses, and more.</p>
                <a href="https://myk-platform.com" 
                   style="background-color: #28a745; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 5px;">
                    Get Started
                </a>
            </body>
        </html>
        """
        
        return EmailNotificationService.send_email(
            to_email=user_data['email'],
            subject="Welcome to MYK Platform! 🎉",
            html_content=html_content
        )


class NotificationQueue:
    """Queue notifications for async sending"""
    
    _queue: List[Dict[str, Any]] = []
    
    @staticmethod
    def add(notification_type: str, data: Dict[str, Any]):
        """Add notification to queue"""
        NotificationQueue._queue.append({
            "type": notification_type,
            "data": data,
            "timestamp": datetime.utcnow()
        })
        logger.info(f"📬 Notification queued: {notification_type}")
    
    @staticmethod
    def process_all():
        """Process all queued notifications"""
        while NotificationQueue._queue:
            notification = NotificationQueue._queue.pop(0)
            
            if notification["type"] == "new_message":
                EmailNotificationService.send_new_message_notification(notification["data"])
            elif notification["type"] == "article_published":
                EmailNotificationService.send_article_published_notification(notification["data"])
            elif notification["type"] == "user_welcome":
                EmailNotificationService.send_user_welcome_email(notification["data"])
