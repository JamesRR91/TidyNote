from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_books, undo_books
from .notes import seed_notes, undo_notes
from .tags import seed_tags, undo_tags
from .taggednotes import seed_taggednotes, undo_taggednotes
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        undo_taggednotes()
        undo_tags()
        undo_notes()
        undo_books()
        undo_users()
    seed_users()
    seed_books()
    seed_notes()
    seed_tags()
    seed_taggednotes()

        # db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.tagged_notes RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        # db.session.commit()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_taggednotes()
    undo_tags()
    undo_notes()
    undo_books()
    undo_users()
    # Add other undo functions here
