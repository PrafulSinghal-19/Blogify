import { useParams } from "react-router-dom"

const Post = () => {
    const { postId } = useParams();
    return <>Post { postId }</>
}

export default Post;