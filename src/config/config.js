const config = {
    appwriteEndPoint: import.meta.env.VITE_APPWRITE_API_END_POINT,

    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID, 
    
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    
    appwriteBlogCollectionId: import.meta.env.VITE_APPWRITE_BLOG_COLLECTION_ID,
    
    appwriteUserCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    
    appwriteStorageId: import.meta.env.VITE_APPWRITE_STORAGE_ID, 
}

export default config;