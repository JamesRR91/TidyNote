from .db import db
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

tagged_notes = db.Table(
    "tagged_notes",
    db.Column("tagId", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    db.Column("noteId", db.Integer, db.ForeignKey("notes.id"), primary_key=True))
