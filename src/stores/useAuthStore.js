import { supabase } from "@/lib/supabaseClient.js";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("UseAuthStore", () => {
  // -- state--
  const loading = ref(false);
  const user = ref(null);

  // -- actions --
  const fetchUser = async () => {
    loading.value = true;
    const { data, error } = await supabase.auth.getUser();
    user.value = data?.user || null;
    loading.value = false;
    console.log(user)
    if (error) console.log("fetch user error:", error);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
      },
    });
    if (error) console.log("signIn error:", error);
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
  return { user, loading, fetchUser, signInWithGoogle, logout };
});
