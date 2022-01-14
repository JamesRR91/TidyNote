from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Book, Note
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

note_routes = Blueprint("notes", __name__)

@note_routes.route("/", methods=['Get'])
@login_required
def get_all_notes():
  all_notes = Note.query.join(Book).filter(Book.userId == current_user.get_id())
  return {'all_notes': [note.to_dict() for note in all_notes]}
# fetch('/api/notes/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data))

@note_routes.route('/new_note', methods=["POST"])
@login_required
def add_note():
    new_note = Note(note_name=request.json['note_name'], note_text=request.json['note_text'], bookId=request.json['bookId'])
    db.session.add(new_note)
    db.session.commit()

    return new_note.to_dict()

@note_routes.route('/<int:noteId>',methods=['DELETE'])
@login_required
def delete_note(noteId):
  note=Note.query.get(noteId)
  db.session.delete(note)
  db.session.commit()

  return note.to_dict()

# fetch('/api/notes/1', {method: 'delete'}).then(res => res.json()).then(data => console.log(data))

@note_routes.route('/<int:noteId>',methods=['PUT'])
@login_required
def edit_note(noteId):
  note=Note.query.get(noteId)
  note.note_name=request.json['note_name']
  note.note_text=request.json['note_text']
  note.bookId=request.json['bookId']
  db.session.commit()

  return note.to_dict()
