import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

class PostServices {
    client = new Client();
    postDatabase;
    postStorage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndPoint)
            .setProject(config.appwriteProjectId);
        this.postStorage = new Storage(this.client);
        this.postDatabase = new Databases(this.client);
    }

    //create a new post
    async createPost({ title, content, status = true, image = [] }, userId, userName) {
        const postObj = {
            title,
            content,
            status,
            userId,
            userName
        };

        //if image is not null upload it on the bucket
        if (image.length > 0) {
            const imageId = await this.uploadImage(image[0]);
            postObj.featuredImage = imageId;
        }

        //create a post in post collection
        return await this.postDatabase.createDocument(config.appwriteDatabaseId, config.appwriteBlogCollectionId, ID.unique(), postObj);

    }

    async getPosts(query = [Query.equal('status', true), Query.orderDesc("$createdAt")]) {
        const activePosts = await this.postDatabase.listDocuments(config.appwriteDatabaseId, config.appwriteBlogCollectionId, query);

        return activePosts.documents;
    }

    async getPost(postId) {
        const post = await this.postDatabase.getDocument(config.appwriteDatabaseId, config.appwriteBlogCollectionId, postId);
        return post;
    }

    async getDocumentByUser(userId) {
        const userPosts = await this.postDatabase.listDocuments(config.appwriteDatabaseId, config.appwriteBlogCollectionId, [
            Query.equal('userId', userId),
            Query.orderDesc('$createdAt')
        ]);

        return userPosts;
    }

    async updateDocument({ title, content, status = true, image = [] }, postId, post) {
        
        const imageId = await this.updateImage(post.featuredImage, image[0]);

        const updateObj = {
            title,
            content,
            status,
            featuredImage: imageId
        };

        return await this.postDatabase.updateDocument(config.appwriteDatabaseId, config.appwriteBlogCollectionId, postId, updateObj);
    }

    async deleteDocument(postId, featuredImage = null) {
        await this.postDatabase.deleteDocument(config.appwriteDatabaseId, config.appwriteBlogCollectionId, postId);
        if (featuredImage) await this.deleteImage(featuredImage);
    }

    //upload an image
    async uploadImage(image) {
        const uploadedImage = await this.postStorage.createFile(config.appwriteStorageId, ID.unique(), image);
        return uploadedImage.$id;
    }

    //delete an image
    async deleteImage(imageId = null) {
        if (imageId)
            await this.postStorage.deleteFile(config.appwriteStorageId, imageId);
    }

    //update an image
    async updateImage(imageId = null, image = null) {
        if (imageId && !image) return imageId;
        if (imageId) await this.deleteImage(imageId);
        if (image) return await this.uploadImage(image)
        return null;
    }

    //Image preview
    async getImagePreview(featuredImage) {
        return this.postStorage.getFilePreview(config.appwriteStorageId, featuredImage);
    }
}

const postServices = new PostServices();
export default postServices;