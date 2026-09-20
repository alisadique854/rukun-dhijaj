import { supabase } from "@/lib/supabase";

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function uploadCategoryImage(file: File) {
  const cleanName = sanitizeFileName(file.name);
  const fileName = `category-${Date.now()}-${cleanName}`;

  const { error } = await supabase.storage
    .from("category-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("category-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadProductImage(file: File) {
  const cleanName = sanitizeFileName(file.name);
  const fileName = `product-${Date.now()}-${cleanName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadOfferImage(file: File) {
  const cleanName = sanitizeFileName(file.name);
  const fileName = `offer-${Date.now()}-${cleanName}`;

  const { error } = await supabase.storage
    .from("offer-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("offer-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}