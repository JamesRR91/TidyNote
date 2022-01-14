from app.models import db, tagged_notes, Tag, Note


# Adds a demo user, you can add other users here if you want
def seed_taggednotes():
    test_note = Note(
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

# notes
    db.session.add(test_note)
    db.session.add(produce)
    db.session.add(meat)
    db.session.add(snacks)
    db.session.add(personal)
    db.session.add(work)

    test_tag = Tag(
        tag_name='Test Tag', userId=1)
    shopping_tag = Tag(
        tag_name='Shopping Tag', userId=1)
    long_term_tag = Tag(
        tag_name='Long Term Tag', userId=1)
    urgent_tag = Tag(
        tag_name='Urgent', userId=1)
# tags
    db.session.add(test_tag)
    db.session.add(shopping_tag)
    db.session.add(long_term_tag)
    db.session.add(urgent_tag)

#tagged_notes
    test_note.tags.append(test_tag)
    produce.tags.append(shopping_tag)
    personal.tags.append(long_term_tag)
    produce.tags.append(urgent_tag)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_taggednotes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE tagged_notes RESTART IDENTITY CASCADE;')
    db.session.commit()
