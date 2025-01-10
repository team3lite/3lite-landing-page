"use server";
import cloudinary from "@/lib/utils/cloudinary";

export const uploadImage = async (formData: FormData) => {
  try {
    const file = formData.get("profile") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "3lite-users",
              transformation: [
                { width: 400, height: 400, crop: "fill", gravity: "face" }, // Crop to square focusing on face
                { quality: "auto:good", fetch_format: "auto" }, // Automatic format and quality optimization
              ],
              eager: [
                // Generate different sizes for responsive loading
                { width: 200, height: 200, crop: "fill", gravity: "face" },
                { width: 100, height: 100, crop: "fill", gravity: "face" },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      }
    );
    return JSON.stringify({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
