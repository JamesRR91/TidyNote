import React from "react";


export default function Sidebar(){
    return(
        <div className="sidebar">
            <AddNote />
            <h3 className="book-title">Books</h3>
            <GetBooks />
            <h3 className="tag-title">Tags</h3>
            <AddTag />
            <GetTags />


        </div>
    )
}
