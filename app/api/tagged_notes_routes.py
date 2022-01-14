from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Book, Note, Tag, tagged_notes
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

tagged_notes_routes = Blueprint("tagged_notes", __name__)

@tagged_notes_routes.route("/", methods=['Get'])
@login_required
def get_all_tagged_notes():
    all_tagged_notes = db.session.query(tagged_notes).join(Tag).filter(Tag.userId == current_user.get_id())
    return {'all_tagged_notes': [{'tagId': tagged_note.tagId,'noteId': tagged_note.noteId} for tagged_note in all_tagged_notes]}
# fetch('/api/taggednotes/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data))

@tagged_notes_routes.route('/new_tagged_note', methods=["POST"])
@login_required
def add_tagged_note():
  noteId=request.json['noteId']
  new_note=Note.query.get(noteId)
  tagId=request.json['tagId']
  new_tag=Tag.query.get(tagId)
  new_note.tags.append(new_tag)
  db.session.commit()

  return {'tagId': tagId,'noteId': noteId}

# const data = { tagId: 5, noteId: 7}

# fetch('/api/taggednotes/new_tagged_note', {
#   method: 'POST',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })
@tagged_notes_routes.route('/', methods=["DELETE"])
@login_required
def delete_tagged_note():
  print('NOTE NOTE', request.json)
  noteId=request.json['noteId']
  deleting_note=Note.query.get(noteId)
  tagId=request.json['tagId']
  deleting_tag=Tag.query.get(tagId)
  deleting_note.tags.remove(deleting_tag)
  db.session.commit()

  return {'tagId': tagId,'noteId': noteId}

# const data = { tagId: 1, noteId: 4}

# fetch('/api/taggednotes/', {
#   method: 'DELETE',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })
