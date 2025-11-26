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

  // ---------------------
  // PROFILE HELPERS
  // ---------------------
  const loadUserProfile = async (id) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

    if (error) throw error;

    userProfile.value = data;

    return data;
  };

  const createProfileIfMissing = async (sessionUser) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sessionUser.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    if (data) {
      // profile exists
      userProfile.value = data;
      return;
    }

    // create new profile
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: sessionUser.id,
        full_name: sessionUser.user_metadata?.name ?? null,
        email: sessionUser.email,
        role: sessionUser.user_metadata?.role ?? "user",
        phone: sessionUser.user_metadata?.phone ?? null,
        address: sessionUser.user_metadata?.address ?? null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    userProfile.value = newProfile;
  };

  // ---------------------
  // AUTH LISTENER
  // ---------------------
  let listenerInitialized = false;

  const initAuthListener = () => {
    if (listenerInitialized) return;
    listenerInitialized = true;

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        // signed out
        user.value = null;
        userProfile.value = null;
        return;
      }

      // signed in
      user.value = session.user;
      try {
        await createProfileIfMissing(session.user);
      } catch (err) {
        console.error("AUTH LISTENER ERROR:", err);
      }
    });
  };

  // ---------------------
  // RESTORE SESSION
  // ---------------------
  const restoreSession = async () => {
    try {
      loading.value = true;


      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const sessionUser = data?.session?.user;
      if (!sessionUser) {
        user.value = null;
        userProfile.value = null;
        return;
      }

      user.value = sessionUser;

      // Fetch fresh profile
      const profile = await loadUserProfile(sessionUser.id);
      userProfile.value = profile;
    } catch (err) {
      console.error("RESTORE SESSION ERROR:", err);
      user.value = null;
      userProfile.value = null;
    } finally {
      loading.value = false;
    }
  };

  // ---------------------
  // AUTH ACTIONS
  // ---------------------
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.DEV
          ? "http://localhost:5173"
          : "https://your-production-domain.com",
      },
    });
    if (error) errorMsg.value = error.message;
  };

  const signUpWithEmail = async (email, password, name) => {
    loading.value = true;
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
    } finally {
      loading.value = false;
    } 
  };

  const signInWithEmail = async (email, password) => {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      errorMsg.value = err.message;
    } finally { 
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        errorMsg.value = error.message;
        loading.value = false;
        return;
      }
    } catch (err) {
      console.error("Logout threw an exception:", err);
    } finally {
      user.value = null;
      userProfile.value = null;
      loading.value = false;
    }
  };

  const updateUserProfile = async (updates) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.value.id)
      .select()
      .single();

    if (error) throw error;

    userProfile.value = data;
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
    updateUserProfile,
  };
});
