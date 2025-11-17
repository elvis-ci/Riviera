import { supabase } from "@/lib/supabaseClient.js";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // ---------------------
  // STATE
  // ---------------------
  const user = ref(null); // Supabase user object (raw)
  const userProfile = ref(null); // Row from "profiles" table
  const loading = ref(false);
  const errorMsg = ref(null);

  // Fetch profile from database
  const loadUserProfile = async (id) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

    if (error) throw error;

    userProfile.value = data;
    localStorage.setItem("profileData", JSON.stringify(data));

    return data;
  };

  // Create profile if it doesn’t exist
  const createProfileIfMissing = async (sessionUser) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sessionUser.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    // If profile already exists → load it
    if (data) {
      userProfile.value = data;
      localStorage.setItem("profileData", JSON.stringify(data));
      return;
    }

    // Otherwise → create new profile
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: sessionUser.id,
        full_name: sessionUser.user_metadata?.name ?? null,
        email: sessionUser.email,
        role: sessionUser.user_metadata?.role ?? "user",
        phone: sessionUser.user_metadata?.phone ?? null,
        address: sessionUser.user_metadata?.address ?? null,
        created_at: sessionUser.created_at,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    userProfile.value = newProfile;
    localStorage.setItem("profileData", JSON.stringify(newProfile));
  };

  // ---------------------
  // AUTH LISTENER
  // ---------------------
  let listenerInitialized = false;

  const initAuthListener = () => {
    if (listenerInitialized) return; // Prevent duplicate listeners
    listenerInitialized = true;

    supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_OUT") {
          user.value = null;
          userProfile.value = null;
          localStorage.removeItem("profileData");
          return;
        }

        if (event === "SIGNED_IN" && session?.user) {
          user.value = session.user;
          await createProfileIfMissing(session.user);
        }
      } catch (err) {
        console.error("AUTH LISTENER ERROR", err);
      }
    });
  };

  // ---------------------
  // RESTORE SESSION (called on app startup)
  // ---------------------
  const restoreSession = async () => {
    try {
      loading.value = true;

      // Load cached profile immediately for fast UI
      const cached = localStorage.getItem("profileData");
      if (cached) userProfile.value = JSON.parse(cached);

      // Get the active session
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      console.log("RESTORE SESSION DATA:", data, userProfile.value);
      const sessionUser = data?.session?.user;

      if (!sessionUser) {
        user.value = null;
        userProfile.value = null;
        return;
      };

      // Set raw user
      user.value = sessionUser;

      // Fetch fresh profile from DB
      await loadUserProfile(sessionUser.id);
    } catch (err) {
      console.error("RESTORE SESSION ERROR:", err);
      user.value = null;
      userProfile.value = null;
      localStorage.removeItem("profileData");
    } finally {
      loading.value = false;
    }
  };

  // ---------------------
  // ACTIONS
  // ---------------------

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.DEV
          ? "http://localhost:5173"
          : "https://rivierademo.vercel.app",
      },
    });

    if (error) errorMsg.value = error.message;
  };

  const signUpWithEmail = async (email, password, name) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: "user" },
          emailRedirectTo: window.location.origin + "/signin",
        },
      });

      if (error) throw error;
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        errorMsg.value = error.message;
      }
    } catch (err) {
      console.error("Logout threw an exception:", err);
    } finally {
      user.value = null;
      userProfile.value = null;
      localStorage.removeItem("profileData");
    }
  };

  // ---------------------
  // RETURN STORE
  // ---------------------
  return {
    user,
    userProfile,
    loading,
    errorMsg,
    initAuthListener,
    restoreSession,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    logout,
  };
});
