from .db import db
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

# Base = declarative_base()

tagged_notes = db.Table(
    "tagged_notes",
    db.Column("tagId", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    db.Column("noteId", db.Integer, db.ForeignKey("notes.id"), primary_key=True))
# class TaggedNote(db.Model, UserMixin):
#     __tablename__ = 'tagged_notes'

#     tagId = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)
#     noteId= db.Column(db.Integer, db.ForeignKey('notes.id'), primary_key=True)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'tagId': self.tagId,
#             'noteId': self.noteId
#         }

# association_table = Table('association', Base.metadata,
#     Column('left_id', ForeignKey('left.id'), primary_key=True),
#     Column('right_id', ForeignKey('right.id'), primary_key=True)
# )

# class Parent(Base):
#     __tablename__ = 'left'
#     id = Column(Integer, primary_key=True)
#     children = relationship(
#         "Child",
#         secondary=association_table,
#         back_populates="parents")

# class Child(Base):
#     __tablename__ = 'right'
#     id = Column(Integer, primary_key=True)
#     parents = relationship(
#         "Parent",
#         secondary=association_table,
#         back_populates="children")
