from sqlalchemy import Column, DateTime, String, create_engine, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


Base = declarative_base()

from . import  Usuario

class Promocao(Base):
    __tablename__   = 'promocao'
    id              = Column(Integer, primary_key=True, autoincrement=True)
    nome            = Column(String(100))
    qtd_pontos      = Column(Integer)
    inicio_vigencia = Column(String(100))
    fim_vigencia    = Column(String(100))
    representante   = Column(Integer, ForeignKey(Usuario.Representate.id))

    def update(self, id=None, nome=None, inicio_vigencia=None, fim_vigencia=None, representante=None,  qtd_pontos=None):
        if nome is not None:
            self.nome = nome
        if inicio_vigencia is not None:
            self.inicio_vigencia = inicio_vigencia
        if fim_vigencia is not None:
            self.fim_vigencia = fim_vigencia
        if representante is not None:
            self.representante = representante
        if qtd_pontos is not None:
            self.qtd_pontos = qtd_pontos
    def dump(self):
        return dict([(k, v) for k, v in vars(self).items() if not k.startswith('_')])