const cloud_name = "dsly1apnf";
const upload_preset = "ecommerce_products";

export const uploadToCloudinary = async (file) => {
  try {
    console.log("UPLOADING FILE =>", file.name);

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", upload_preset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const result = await response.json();

    console.log("CLOUDINARY RESPONSE =>", result);

    return result.secure_url;
  } catch (error) {
    console.error("UPLOAD ERROR =>", error);
    return null;
  }
};
