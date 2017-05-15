from sqlalchemy import Column, DateTime, String, create_engine, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
import orm_base

def init_db(uri):
    engine = create_engine(uri, convert_unicode=True)
    db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
    orm_base.Base.query = db_session.query_property()
    orm_base.Base.metadata.create_all(bind=engine)
    return db_session
