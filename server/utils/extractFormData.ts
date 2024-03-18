// const extractFormData = (formData: FormData) => {
//   const titleData = formData.get("title");
//   const bodyData = formData.get("body");
//   const shortBodyData = formData.get("shortBody");
//   const authorData = formData.get("author");
//   const imageBg = formData.get("imageBg");
//   const imagePrev = formData.get("imagePrev");
//   const tagsData = formData.get("tags");
//   return {
//     title: titleData && (titleData as string),
//     body: bodyData && (bodyData as string),
//     shortBody: shortBodyData && (shortBodyData as string),
//     author: authorData && (authorData as string),
//     imageBg,
//     imagePrev,
//     tags: tagsData && Array.isArray(tagsData) && (tagsData as Array<string>),
//   };
// };

const extractFormData = <T>(formData: FormData): T => {
  const extractREsult = Object.create({});
  for (const item in formData) {
    const getData = formData.get(item);
    getData &&
      Object.defineProperty(extractREsult, item, {
        value: getData,
      });
    // if (getData) {

    //   getData instanceof File &&
    //     Object.defineProperty(extractREsult, item, {
    //       value: getData,
    //     });
    //   Array.isArray(getData) &&
    //     Object.defineProperty(extractREsult, item, {
    //       value: getData as string[],
    //     });
    //   typeof getData === "string" &&
    //     Object.defineProperty(extractREsult, item, {
    //       value: getData,
    //     });
    // }
  }
  return extractREsult as T;
};
export default extractFormData;
