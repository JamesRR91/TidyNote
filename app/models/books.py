from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Book(db.Model, UserMixin):
    __tablename__ = 'books'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_name = db.Column(db.String(25), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
    user=db.relationship('User', back_populates='books')
    notes=db.relationship('Note', back_populates='book', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'book_name': self.book_name,
            'userId': self.userId
        }
