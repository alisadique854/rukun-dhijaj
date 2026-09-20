import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ===========================
   Delete Image
=========================== */

export async function deleteImage(
  bucket: string,
  imageUrl: string
) {
  if (!imageUrl) return;

  try {
   
    const fileName = imageUrl.split("/").pop();

    if (!fileName) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error("Delete Error:", error);
    }
  } catch (err) {
    console.error(err);
  }
}