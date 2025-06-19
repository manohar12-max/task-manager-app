import os
import jwt
from dotenv import load_dotenv
from django.http import HttpRequest

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

def verify_jwt_token(request: HttpRequest):
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return None

    try:
        
        token_type, token = auth_header.split(" ")

        if token_type != "Bearer":
            return None

        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload  

    except (ValueError, jwt.ExpiredSignatureError, jwt.DecodeError):
        return None
