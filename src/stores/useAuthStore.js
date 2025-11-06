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
    loading.value = true;
    const { data, error } = await supabase.auth.getUser();
    user.value = data?.user || null;
    loading.value = false;
    console.log(user);
    if (error) console.log("fetch user error:", error);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
      },
    });
    if (error) errorMsg.value = error.message;
    user.value = data.user;
    return data;
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

  const signInWithEmail = async (email, password) => {
    errorMsg.value = null;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
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
