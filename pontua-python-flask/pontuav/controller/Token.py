import jwt
from json import dumps

def geraToken(email, senha, role = "cliente"):
    token =jwt.encode({'email': email, 'role': role}, senha, algorithm='HS256')
    #return token
    return dumps(token, default=str).strip('"')