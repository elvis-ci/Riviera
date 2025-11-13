import { supabase } from "@/lib/supabaseClient.js";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("UseAuthStore", () => {
  // -- state--
  const loading = ref(false);
  const user = ref(null);
  const errorMsg = ref(null);

  // -- actions --
  const fetchUser = async () => {
    try {
      // Check cache first
      const cachedUser = localStorage.getItem("userData");
      if (cachedUser) {
        user.value = JSON.parse(cachedUser); // Already formatted
        return;
      }

      //Fetch user from Supabase
      loading.value = true;
      const { data, error } = await supabase.auth.getUser();
      loading.value = false;

      if (error || !data?.user) throw new Error(error?.message || "No user found");

      const userData = data.user;
      const date = new Date(userData.created_at);

      // Format user data
      const formattedUser = {
        name: userData.user_metadata?.name || "No Name",
        email: userData.user_metadata?.email || "No Email",
        phone: userData.user_metadata?.phone || "012345678",
        address: userData.user_metadata?.address || "5, plutomania",
        joined: `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`,
      };

      // Assign to reactive state
      user.value = formattedUser;

      //Cache the formatted user
      localStorage.setItem("userData", JSON.stringify(formattedUser));
    } catch (err) {
      errorMsg.value = `Error fetching user: ${err.message}`;
      user.value = null;
      localStorage.removeItem("userData");
      loading.value = false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/",
        },
      });

      if (error) {
        errorMsg.value = error.message;
        return;
      }
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const signUpWithEmail = async (email, password, name) => {
    errorMsg.value = null;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name },
          emailRedirectTo: window.location.origin + "/signin",
        },
      });
      if (error) throw error;
      return data;
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const signInWithEmail = async (email, password, rememberMe) => {
    errorMsg.value = null;
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
        { persistSession: rememberMe }
      );
      if (error) throw error;

      if (data) {
        user.value = data.user;
      } else {
        user.value = null;
      }
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    user.value = null;
    localStorage.removeItem("userData");
  };

  // --- Auth listener (optional but recommended) ---
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") user.value = session?.user;
    if (event === "SIGNED_OUT") user.value = null;
  });

  // Return state + actions
  return {
    user,
    fetchUser,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    errorMsg,
    logout,
  };
});
