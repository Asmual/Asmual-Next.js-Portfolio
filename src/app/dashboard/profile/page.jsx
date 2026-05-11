/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import ProfileView from "@/components/dashboard/ProfileView";
import ProfileEdit from "@/components/dashboard/ProfileEdit";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const sessionData = await authClient.getSession();

      if (sessionData?.data?.session) {
        setSession(sessionData.data);

        const res = await fetch("/api/user/update");
        const data = await res.json();

        if (data.profile) {
          setProfile(data.profile);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {editing ? (
          <ProfileEdit
            session={session}
            profile={profile}
            onCancel={() => setEditing(false)}
            onSave={handleSave}
          />
        ) : (
          <ProfileView
            session={session}
            profile={profile}
            onEdit={() => setEditing(true)}
          />
        )}
      </div>
    </div>
  );
}