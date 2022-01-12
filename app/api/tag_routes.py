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
# fetch('/api/books/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));
