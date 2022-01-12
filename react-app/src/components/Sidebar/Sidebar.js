import React from "react";
import { getBooks } from "../../store/book";
import GetBooks from "../GetBooks/GetBooks";
import PostBook from "../PostBook/PostBook";
import './Sidebar.css';

export default function Sidebar(){
    return(
            <div className="sidebar">
                <h3 className="book-title">Books</h3>
                <PostBook />
                <GetBooks />
                <h3 className="tag-title">Tags</h3>
            </div>
    )
}
