from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_books, undo_books
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
        undo_users()
        undo_books()
        undo_taggednotes()
    seed_users()
    seed_books()
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
    undo_users()
    undo_books()
    undo_taggednotes()
    # Add other undo functions here
