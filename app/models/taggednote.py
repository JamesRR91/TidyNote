from .db import db
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

tagged_notes = db.Table(
    "tagged_notes",
    Base.metadata,
    db.Column("tagId", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    db.Column("noteId", db.Integer, db.ForeignKey("notes.id"), primary_key=True))
# class TaggedNote(db.Model, UserMixin):
#     __tablename__ = 'tagged_notes'

#     id = db.Column(db.Integer, primary_key=True)
#     tagId = db.Column(db.Integer, nullable=False, db.ForeignKey('tags.id'))
#     noteId= db.Column(db.Integer, nullable=False, db.ForeignKey('notes.id'))

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'tagId': self.tagId,
#             'noteId': self.noteId
#         }
