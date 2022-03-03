import React from "react";
import { getBooks } from "../../store/book";
import GetBooks from "../GetBooks/GetBooks";
import GetNotes from "../GetNotes/GetNotes";
import GetNotesDashBoard from "../GetNotesDashboard/GetNotesDashBoard";
import PostBook from "../PostBook/PostBook";
import PostTag from "../PostTag/PostTag";
import GetTags from "../GetTags/GetTags";
import './Sidebar.css';
import { Route, Switch } from "react-router-dom";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar1">
                <h3 className="book-title">My Books</h3>
                <PostBook />
                <GetBooks />
                <h3 className="book-title-tags">My Tags</h3>
                <PostTag />
                <GetTags />
            </div>
            <div className="sidebar2">
            <h3 className="book-title">My Notes</h3>
            <Switch>
                <Route path='/' exact>
                    <GetNotesDashBoard />
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
