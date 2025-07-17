import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.kreyon.eatopia",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  categoriesId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_ID,
  customizationsId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_ID,
  menuId: process.env.EXPO_PUBLIC_APPWRITE_MENU_ID,
  menuCustomizationsId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_ID,
  buckedId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);
export const storage = new Storage(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserPrams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitialsURL(name);

    return await database.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    );
  } catch (e: any) {
    console.error("Create user error:", e);
    throw new Error(e.message || e.toString() || "Failed to create user");
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e: any) {
    console.error("Sign in error:", e);
    throw new Error(e.message || e.toString() || "Failed to sign in");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    console.log(currentUser);
    return currentUser.documents[0];
  } catch (e: any) {
    console.log("Get current user error:", e);
    throw new Error(e.message || e.toString() || "Failed to get current user");
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error: any) {
    console.log("Sign out error:", error);
    // Don't throw error if no session exists
    return true;
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.contains("name", query));

    const menus = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.menuId!,
      queries
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.categoriesId!
    );

    return categories.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};
