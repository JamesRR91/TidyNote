from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note


class EditNoteForm(FlaskForm):
    note_name = StringField('Note Name', validators=[DataRequired()])
    note_text= TextField('Note Text', validators=[DataRequired()])
    submit=SubmitField("Submit")
