// Scaling images

export const demoDoc = () => {
  fetch(`http://127.0.0.1:8000/images/boy.jpg`)
    .then((response) => response.blob())
    .then((blob) => {
      // Use the image data (blob) as needed
      // console.log(blob);

      // Convert the image data to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        // console.log(base64Data);
      };
      reader.readAsDataURL(blob);
    })
    .catch((error) => {
      console.error(error);
    });
};
