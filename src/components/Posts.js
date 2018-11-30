import React from 'react';
import { Link } from "react-router-dom";

const Posts = () => {
    return (
        <div>
            <h2>Posts</h2>
            <h2>Go to products</h2>
            <ul>
                <li><Link to="/products/video">Video</Link></li>
                <li><Link to="/products/computers">Computers</Link></li>
                <li><Link to="/products/audio">Audio</Link></li>
            </ul>
        </div>
    )
}

export default Posts
