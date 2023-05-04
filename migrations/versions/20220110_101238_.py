"""empty message

Revision ID: 9e9d741a88e1
Revises: ffdc0a98111c
Create Date: 2022-01-10 10:12:38.111674

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '9e9d741a88e1'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_name', sa.String(length=25), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('book_name')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE books SET SCHEMA {SCHEMA};")

    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_name', sa.String(length=15), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('note_name', sa.String(length=30), nullable=False),
    sa.Column('note_text', sa.Text(), nullable=False),
    sa.Column('bookId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['bookId'], ['books.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == 'production':
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('notes')
    op.drop_table('tags')
    op.drop_table('books')
    # ### end Alembic commands ###
