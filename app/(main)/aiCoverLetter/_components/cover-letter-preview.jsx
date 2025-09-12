"use client"
import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
    return <div className="py-4">
        <MDEditor
            value={content}
            height={800}
            preview="preview"
        />
    </div>
}
export default CoverLetterPreview;