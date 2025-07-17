import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),

  async fetchAuthenticatedUser() {
    console.log("fetchAuthenticatedUser started");
    set({ isLoading: true });

    try {
      console.log("Calling getCurrentUser...");
      const userDoc = await getCurrentUser();
      console.log("getCurrentUser result:", userDoc);
      if (userDoc) {
        const user: User = {
          name: userDoc.name,
          email: userDoc.email,
          avatar: userDoc.avatar,
          $id: "",
          $collectionId: "",
          $databaseId: "",
          $createdAt: "",
          $updatedAt: "",
          $permissions: [],
        };
        console.log("Setting isAuthenticated to true");
        set({ isAuthenticated: true, user });
      } else {
        console.log("No user document found");
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.log("fetchAuthenticatedUser error:", error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
      console.log("fetchAuthenticatedUser completed");
    }
  },
}));

export default useAuthStore;
