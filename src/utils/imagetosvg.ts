import axios from "axios";

function blobToBase64(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result); // Remove the data URI prefix
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
}
const imagetosvg = async (images: any) => {
  const imageUrl = import.meta.env.VITE_BASE_URL + `${images}`;
  // Replace with your base URL
  // console.log(imageUrl);
  const response = await axios.get(imageUrl, { responseType: "blob", });

  //   console.log("imagetosvg", response.data);

  if (response.status === 200) {
    const blob = response.data;
    // console.log("BLOB", blob);

    const base64Image = await blobToBase64(blob);
    return base64Image;
  } else {
    console.error(`Failed to fetch image: ${imageUrl}`);
    return null; // Return null for failed requests
  }
};

export default imagetosvg;
