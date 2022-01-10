from app.models import db, Tag


# Adds a demo user, you can add other users here if you want
def seed_tags():
    test = Tag(
        tag_name='Test Tag', userId=1)
    shopping = Tag(
        tag_name='Shopping Tag', userId=1)
    long_term = Tag(
        tag_name='Long Term Tag', userId=1)
    urgent = Tag(
        tag_name='Urgent', userId=1)

    db.session.add(test)
    db.session.add(shopping)
    db.session.add(long_term)
    db.session.add(urgent)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
