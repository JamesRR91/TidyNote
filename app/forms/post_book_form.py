from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Book


class PostBookForm(FlaskForm):
    book_name = StringField('Book Name', validators=[DataRequired()])
    submit=SubmitField("Submit")
