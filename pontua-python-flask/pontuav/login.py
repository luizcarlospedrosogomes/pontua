#!/usr/bin/env python3
'''
Connexion HTTP Basic Auth example

Most of the code stolen from http://flask.pocoo.org/snippets/8/

Warning: It is recommended to use 'decorator' package to create decorators for
         your view functions to keep Connexion working as expected. For more
         details please check: https://github.com/zalando/connexion/issues/142
'''

import connexion
import flask

try:
    from decorator import decorator
except ImportError:
    import sys
    import logging
    logging.error('Missing dependency. Please run `pip install decorator`')
    sys.exit(1)


def check_auth(email: str, senha: str):
    '''This function is called to check if a username /
    password combination is valid.'''
    return email == 'admin' and senha == 'secret'


def authenticate():
    '''Sends a 401 response that enables basic auth'''
    return flask.Response('necessario login', 401,
                          {'WWW-Authenticate': 'Basic realm="Login Required"'})


@decorator
def requires_auth(f: callable, *args, **kwargs):
    auth = flask.request.authorization
    if not auth or not check_auth(auth.email, auth.senha):
        return authenticate()
    return f(*args, **kwargs)

def logout():
    pass

@requires_auth
def login() -> str:
    return 'Verificar token de autenticacao!'

