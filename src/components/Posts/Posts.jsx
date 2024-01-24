import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/postSlice';
import { PostCard } from "../index"

const Posts = () => {
    const dispatch = useDispatch();
    const promiseStatus = useSelector(state => state.post.promiseStatus);
    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        if (promiseStatus === 'idle') dispatch(getPosts());
    }, []);

    return (
        <div>
            {posts.map(post => <PostCard key={post.$id} post={post} />)}
        </div>
    )
}

export default Posts