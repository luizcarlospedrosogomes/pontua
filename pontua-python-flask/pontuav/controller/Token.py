import jwt
from flask_jwt_extended import create_access_token, get_jwt_identity
from json import dumps
#import app

def geraToken(email, senha, role = "cliente"):
    return  {'access_token': create_access_token(identity=email)}
    #token =jwt.encode({'email': email, 'role': role}, senha, algorithm='HS256')
    #return token
    #return dumps(token, default=str).strip('"')