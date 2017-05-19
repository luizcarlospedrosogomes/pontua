#!/usr/bin/env python3
import connexion
import flask
import json
from model.orm_base import Base
from model.Usuario import User
from .Token import geraToken


try:
    from decorator import decorator
except ImportError:
    import sys
    import logging
    logging.error('Missing dependency. Please run `pip install decorator`')
    sys.exit(1)

db_session = None

def check_auth(email, senha):
    #db_session.Base.User.query(User).filter(User.email == email, User.senha == senha)
    print("checando email: ", email,"checando senha", senha)
    query = User.query.filter_by(email = email, senha = senha)
    return query.count()
    
def authenticate():
    '''Sends a 401 response that enables basic auth'''
    return flask.Response('necessario login', 401,
                          {'WWW-Authenticate': 'Basic realm="Login Required"'})


@decorator
def requires_auth(f: callable, *args, **kwargs):
    dados = flask.request.json
    if not dados or check_auth(dados['email'],dados['senha'])!=1:
        return authenticate()
    return  geraToken(dados['email'], dados['senha'])
  
def logout():
    pass

@requires_auth
def login() -> str:
    return 'Verificar token de autenticacao!'

