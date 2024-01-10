import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuid } from "uuid";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }

  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function addCabin(newCabinData, id) {
  //trick upon updating the image- whether its a string or object
  // console.log(newCabinData, id);
  const hasimagePath = newCabinData.image?.startsWith?.(supabaseUrl);

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 10);
  // creating a unique name
  const imageName = `${small_id}-${newCabinData.image.name}`.replace("/", "");

  const imagePath = hasimagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //CREATE/EDIT FUNCTION FORMAT
  //***************************************************************
  //change up the function.... if there's no id create a cabin from the form. * /
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabinData, image: imagePath }]);

  //*******************************************************************
  //iF a id is available update the supabase function * /
  if (id)
    query = query.update({ ...newCabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Something went wrong with inserting a Cabin");
  }

  if (hasimagePath) return data;

  const avatarFile = newCabinData.image;
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    //upload path:we are collecting the path from the table
    .upload(`${imageName}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(uploadError);
    throw new Error("Something went wrong with inserting a Cabin Image");
  }

  return data;
}
