from sqlalchemy import Column, DateTime, String, create_engine, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from .orm_base import  Base

class User(Base):
    __tablename__   = 'usuario'
    id              = Column(Integer, primary_key=True, autoincrement=True)
    email           = Column(String(100))
    senha           = Column(String(20))
    role            = Column(String(50))

    def update(self, id=None,  email=None, senha=None):
        if nome is not None:
            self.nome = nome
        if email is not None:
            self.email = email
        if senha is not None:
            self.senha = senha
        if role is not None:
            self.role = role

    def dump(self):
        return dict([(k, v) for k, v in vars(self).items() if not k.startswith('_')])


class Representate(Base):
    __tablename__   = 'representante'
    id              = Column(Integer, primary_key=True, autoincrement=True)
    nome            = Column(String(100))

    def update(self, id=None, nome=None):
        if nome is not None:
            self.nome = nome

    def dump(self):
        return dict([(k, v) for k, v in vars(self).items() if not k.startswith('_')])


