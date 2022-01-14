from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from app.models import db, User, Book, Note
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required

book_routes = Blueprint("books", __name__)



@book_routes.route("/", methods=['Get'])
@login_required
def get_all_books():
  all_books = Book.query.filter(Book.userId == current_user.get_id()).all()
  return {'all_books': [book.to_dict() for book in all_books]}

# fetch('/api/books/', {method: 'Get'}).then(res => res.json()).then(data => console.log(data));


@book_routes.route('/new_book', methods=["POST"])
@login_required
def add_book():
    new_book = Book(book_name=request.json['book_name'],userId=current_user.get_id())
    db.session.add(new_book)
    db.session.commit()

    return new_book.to_dict()


# const data = { note_name: 'PLEASE CHANGE', note_text: 'NO REALLY, I WANNA BE DONE EARLY', bookId: 7}

# fetch('/api/notes/1', {
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

@book_routes.route('/<int:bookId>',methods=['DELETE'])
@login_required
def delete_book(bookId):
  book=Book.query.get(bookId)
  db.session.delete(book)
  db.session.commit()

  return book.to_dict()

@book_routes.route('/<int:bookId>',methods=['PUT'])
@login_required
def edit_book(bookId):
  print('BOOKID', bookId, type(bookId))
  book=Book.query.get(bookId)
  print('BOOK BOOK BOOK BOOK', book, type(book))
  book.book_name=request.json['book_name']
  db.session.commit()

  return book.to_dict()


# fetch('/api/books/4', {method: 'delete'}).then(res => res.json()).then(data => console.log(data));

# @book_routes.route('/<int:bookId>', methods=["POST"])
# @login_required
# def add_note(bookId):
#     new_note = Note(note_name=request.json['note_name'], note_text=request.json['note_text'], bookId=bookId)
#     db.session.add(new_note)
#     db.session.commit()

#     return new_note.to_dict()
