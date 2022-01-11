from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Book
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user

book_routes = Blueprint("books", __name__)



@book_routes.route("/", methods=['Get'])
def get_all_books():
  # print("????????????????????????????????????????????????????????????????")
  print("?????????????????????????????????????/" + current_user.get_id())
  all_books = Book.query.filter(Book.userId == current_user.get_id()).all()
  # all_books = Book.query.filter(Book.userId == current_user.get_id()).all()
  print(all_books[0])
  return {'all_books': [book.to_dict() for book in all_books]}


@book_routes.route('/new_book', methods=["GET", "POST"])
def add_book():
    print("REQUEST!!!", request.json)

    new_book = Book(book_name=request.json['book_name'],userId=request.json['userId'])
    db.session.add(new_book)
    db.session.commit()

    return new_book.to_dict()


# const data = { name: 'test_newbook1', userId: '1' };

# fetch('/api/books', {
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
