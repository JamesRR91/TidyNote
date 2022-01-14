import React from "react";
import { getBooks } from "../../store/book";
import GetBooks from "../GetBooks/GetBooks";
import GetNotes from "../GetNotes/GetNotes";
import PostNote from "../PostNote/PostNote";
import PostBook from "../PostBook/PostBook";
import PostTag from "../PostTag/PostTag";
import GetTags from "../GetTags/GetTags";
import './Sidebar.css';
import { Route, Switch } from "react-router-dom";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar1">
                <h3 className="book-title">Books</h3>
                <PostBook />
                <GetBooks />
                <h3 className="tag-title">Tags</h3>
                <PostTag />
                <GetTags />
            </div>
            <div className="sidebar2">
            <h3 className="book-title">Notes</h3>
            <PostNote />
            <Switch>
                <Route path='/' exact>
                    <GetNotes />
                </Route>
                <Route path='/books/:bookId'>
                    <GetNotes />
                </Route>
                <Route path='/tags/:tagId'>
                    <GetNotes />
                </Route>
            </Switch>
            </div>
        </div>
    )
}
