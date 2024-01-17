import { Client, Account, Storage, Databases, ID } from "appwrite";
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

    async signup({ email, password, firstName, lastName, profileImage = [] }) {

        const name = `${firstName} ${lastName}`;

        await this.account.create(ID.unique(), email, password, name);

        const userAccount = await this.login(email, password);

        if (profileImage.length > 0) {
            const imageId = await this.uploadImage(profileImage[0]);

            await this.userDatabase.createDocument(config.appwriteDatabaseId, config.appwriteUserCollectionId, ID.unique(), {
                userId: userAccount.$id,
                userImage: imageId.$id
            })
        }

        return userAccount.$id;
    }

    async login(email, password) {
        const userAccount = await this.account.createEmailSession(email, password);
        return userAccount.$id;
    }

    getActiveUser() {
        return this.account.get();
    }

    async logout() {
        await this.account.deleteSessions();
    }

    async uploadImage(file) {
        return await this.userStorage.createFile(config.appwriteStorageId, ID.unique(), file);
    }

    async deleteImage(fileId) {
        await this.userStorage.deleteFile(config.appwriteStorageId, fileId);
    }

    async updateImage(file, fileId = null) {
        if (fileId) await this.deleteImage(fileId);
        await this.uploadImage(file);
    }

    getImagePreview(fileId = null) {
        if (fileId) {
            return this.userStorage.getFilePreview(config.appwriteStorageId, fileId);
        }
        else {
            return null;
        }
    }
}

const userAuth = new UserAuth();

export default userAuth;