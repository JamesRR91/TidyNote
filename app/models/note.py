from .db import db
from .taggednote import tagged_notes
from flask_login import UserMixin


class Note(db.Model, UserMixin):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    note_name = db.Column(db.String(30), nullable=False)
    note_text = db.Column(db.Text, nullable=False)
    bookId= db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False, )
    book=db.relationship('Book', back_populates='notes')
    tags=db.relationship('Tag', secondary=tagged_notes, back_populates='notes')
    def to_dict(self):
        return {
            'id': self.id,
            'note_name': self.note_name,
            'note_text': self.note_text,
            'bookId': self.bookId
        }
