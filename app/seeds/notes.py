from app.models import db, Note


# Adds a demo user, you can add other users here if you want
def seed_notes():
    testNote = Note(
        note_name='TestNote', note_text='testing 123', bookId=1)
    produce = Note(
        note_name='Produce', note_text='veggies', bookId=2)
    meat = Note(
        note_name='Meat', note_text='steak', bookId=2)
    snacks = Note(
        note_name='Snacks', note_text='chips and guac', bookId=2)
    personal = Note(
        note_name='Personal', note_text='my life', bookId=3)
    work = Note(
        note_name='Career', note_text='required', bookId=3)

    db.session.add(testNote)
    db.session.add(produce)
    db.session.add(meat)
    db.session.add(snacks)
    db.session.add(personal)
    db.session.add(work)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
