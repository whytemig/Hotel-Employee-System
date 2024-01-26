import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLoginUser() {
  //fetch the login user session from local storage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }
  // fetch the current user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  //1.different forms for password n fullname so it needs to be updated separately
  let upDataData;

  if (password) upDataData = { password };
  if (fullName) upDataData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(upDataData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;
  //2.upload image for avatar

  //unique file name
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarError) {
    throw new Error(avatarError.message);
  }
  // 3.update avatar in the user

  const { data: updateUser, error: errorUser } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );

  if (errorUser) {
    throw new Error(errorUser.message);
  }

  return updateUser;
}
