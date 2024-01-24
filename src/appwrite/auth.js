import { Client, Account, Storage, Databases, ID, Query } from "appwrite";
import config from "../config/config"

class UserAuth {
    client = new Client();
    account;
    userStorage;
    userDatabase;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndPoint)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
        this.userStorage = new Storage(this.client);
        this.userDatabase = new Databases(this.client);
    }

    async signup({ email, password, firstName, lastName, userImage = [] }) {

        const name = `${firstName} ${lastName}`;

        await this.account.create(ID.unique(), email, password, name);

        const userAccount = await this.login({email, password});

        if (userImage.length > 0) {
            const imageId = await this.uploadImage(userImage[0]);

            await this.userDatabase.createDocument(config.appwriteDatabaseId, config.appwriteUserCollectionId, ID.unique(), {
                userId: userAccount.$id,
                userImage: imageId
            })
        }

        return userAccount;
    }

    async login({email, password}) {
        const userAccount = await this.account.createEmailSession(email, password);
        return userAccount;
    }

    async getActiveUser() {
        try {
            return await this.account.get();    
        }
        catch (error) {
            console.log(error.message)
            return false;
        }        
    }

    async logout() {
        await this.account.deleteSessions();
    }

    async uploadImage(image) {
        const uploadedImage = await this.userStorage.createFile(config.appwriteStorageId, ID.unique(), image);
        return uploadedImage.$id;
    }

    async getUserImageId(userId) {
        const userData = await this.userDatabase.listDocuments(config.appwriteDatabaseId, config.appwriteUserCollectionId, [
            Query.equal('userId', userId)
        ]);
        return userData.userImage;
    }

    async getImagePreview(userId) {
        const imageId = await this.getUserImageId(userId);
        if (imageId) {
            return this.userStorage.getFilePreview(config.appwriteStorageId, imageId);
        }
        else {
            return null;
        }
    }
}

const userAuth = new UserAuth();

export default userAuth;