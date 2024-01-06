import supabase from "./supabase";

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

export async function addCabin(newCabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabinData])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Something went wrong with inserting a Cabin");
  }

  return data;
}
