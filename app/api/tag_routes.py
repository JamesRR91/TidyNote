from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Book, Note, Tag, tagged_notes
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

tag_routes = Blueprint("tags", __name__)

@tag_routes.route("/", methods=['Get'])
@login_required
def get_all_tags():
    all_tags=Tag.query.filter(Tag.userId == current_user.get_id()).all()
    return {'all_tags': [tag.to_dict() for tag in all_tags]}
# fetch('/api/tags/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));

@tag_routes.route('/new_tag', methods=["POST"])
@login_required
def add_tag():
    new_tag = Tag(tag_name=request.json['tag_name'],userId=current_user.get_id())
    db.session.add(new_tag)
    db.session.commit()

    return new_tag.to_dict()

# const data = { tag_name: 'PLEASE_POST_TAG', userId: 1}

# fetch('/api/tags/new_tag', {
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

@tag_routes.route('/<int:tagId>',methods=['DELETE'])
@login_required
def delete_tag(tagId):
  tag=Tag.query.get(tagId)
  db.session.delete(tag)
  db.session.commit()

  return tag.to_dict()

#   fetch('/api/tags/5', {method: 'delete'}).then(res => res.json()).then(data => console.log(data));

@tag_routes.route('/<int:tagId>',methods=['PUT'])
@login_required
def edit_tag(tagId):
  tag=Tag.query.get(tagId)
  tag.tag_name=request.json['tag_name']
  db.session.commit()

  return tag.to_dict()

#   const data = { tag_name: 'PLEASE_CHANGE'}

# fetch('/api/tags/1', {
#   method: 'PUT',
#   headers: {
#     'Content-Type': 'application/json',
#   },
#   body: JSON.stringify(data),
# })
# .then(response => response.json())
# .then(data => {
#   console.log('Success:', data);
# })
