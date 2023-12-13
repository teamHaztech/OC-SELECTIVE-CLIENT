import * as htmlToImage from "html-to-image";
const convertElementToImage = async (element: any) => {
  // console.log(element.current);
  if (element && element.current) {
    const dataUrl = await htmlToImage.toPng(element.current);
    // const anchorElement = document.createElement("a");
    // anchorElement.href = dataUrl;
    // anchorElement.download = "image.png";

    // anchorElement.click();
    return dataUrl;
  }

  return null;
};
const generateQuestionObjects = async (paraData: any): Promise<any[]> => {
  const questionObjects = [];

 
    for (const item2 of paraData) {
      const questionObj: any = {};
      // console.log(item2.question_image.ref);

      const questionImageDataUrl = await convertElementToImage(
        item2.question_image.ref
      );
      // console.log(item2.question_image);

      questionObj.question_image = questionImageDataUrl;

      const optionImages: any = {};
      for (let j = 0; j < item2.options.length; j++) {
        // console.log(item2.options[j]?.ref);
        if(item2.options[j].ref){

          const optionImageDataUrl = await convertElementToImage(
            item2.options[j].ref 
          );
          optionImages[String.fromCharCode(97 + j)] = optionImageDataUrl;
        }else{
          optionImages[String.fromCharCode(97 + j)] = item2.options[j];
        }
        // optionImages[String.fromCharCode(97 + j)] = 
      }
      questionObj.options = optionImages;
      questionObj.correct_ans = item2.correct_ans;
      questionObj.question = item2.question;

      questionObjects.push(questionObj);
    }


  return questionObjects;
};

export { generateQuestionObjects };
