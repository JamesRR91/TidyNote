from app.models import db, Book


# Adds a demo user, you can add other users here if you want
def seed_books():
    test = Book(
        book_name='Test', userId=1)
    groceries = Book(
        book_name='Grocery List', userId=1)
    goals = Book(
        book_name='Goals', userId=1)

    db.session.add(test)
    db.session.add(groceries)
    db.session.add(goals)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_books():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.commit()
