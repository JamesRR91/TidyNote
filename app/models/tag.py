from .db import db
from .taggednote import tagged_notes
from flask_login import UserMixin


class Tag(db.Model, UserMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(15), nullable=False)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False )
    user=db.relationship('User', back_populates='tags')
    notes=db.relationship('Note', secondary=tagged_notes, back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'userId': self.userId
        }
