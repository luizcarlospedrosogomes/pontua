#!/usr/bin/env python3
import datetime
import logging
import connexion
from connexion import NoContent
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager,jwt_required
#model
from model.Promocao import *
from model.orm_base import *
from model.orm_base import Base
from decorator import decorator
from controller.Login import *

db_session = None

#@requires_auth
@jwt_required
def get_promocoes():
    q = db_session.query(Promocao)

    return [p.dump() for p in q]

@jwt_required
def get_promocao(promocao_id):
    promocao = db_session.query(Promocao).filter(Promocao.id == promocao_id).one_or_none()
    return promocao.dump() or ('Not found', 404)


def put_promocao(promocao_id, promocao):
    p = db_session.query(Promocao).filter(Promocao.id == promocao_id).one_or_none()
    promocao['id'] = promocao_id
    if p is not None:
        logging.info('Updating pet %s..', promocao_id)
        p.update(**promocao)
    else:
        logging.info('Creating pet %s..', promocao_id)
        #   promocao['created'] = datetime.datetime.utcnow()
        db_session.add(Promocao(**promocao))
    db_session.commit()
    return NoContent, (200 if p is not None else 201)


def delete_promocao(promocao_id):
    pet = db_session.query(Promocao).filter(Promocao.id == promocao_id).one_or_none()
    if pet is not None:
        logging.info('Deleting pet %s..', promocao_id)
        db_session.query(Promocao).filter(Promocao.id == promocao_id).delete()
        db_session.commit()
        return NoContent, 204
    else:
        return NoContent, 404

logging.basicConfig(level=logging.INFO)
#db_session = orm.init_db('sqlite:///db_login2.sqlite')
engine = create_engine('sqlite:///db_login2.sqlite', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base.query = db_session.query_property()
Base.metadata.create_all(bind=engine)
#Session = sessionmaker(bind=engine)
#session = Session()
#promocao_tab = Promocao

app = connexion.FlaskApp(__name__)
app.debug = True
app.add_api('swagger.yaml')
application = app.app
application.secret_key = 'pontua'
jwt = JWTManager(application)
CORS(application)

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    app.run(port=8080)
    #CORS(app)
