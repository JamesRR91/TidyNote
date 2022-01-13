import React from "react";
import { getBooks } from "../../store/book";
import GetBooks from "../GetBooks/GetBooks";
import GetNotes from "../GetNotes/GetNotes";
import PostNote from "../PostNote/PostNote";
import PostBook from "../PostBook/PostBook";
import './Sidebar.css';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar1">
                <h3 className="book-title">Books</h3>
                <PostBook />
                <GetBooks />
                <h3 className="tag-title">Tags</h3>
            </div>
            <div className="sidebar2">
                <h3 className="book-title">Notes</h3>
                <PostNote />
                <GetNotes />
            </div>
        </div>
    )
}
