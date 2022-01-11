from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db,User,Book
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user

book_routes = Blueprint("books",__name__)

@book_routes.route("/", methods=['Get'])
def get_all_books():
  all_books = Book.query.filter(Book.userId == current_user.get_id()).all()
  return {'all_books': [book.to_dict() for book in all_books]}
