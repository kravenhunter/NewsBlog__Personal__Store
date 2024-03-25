import type { Tag } from "@prisma/client";

const converToCurrentTags = (currenttagsArray: string[], tagList: Tag[]) => {
  const tagsArr: Tag[] = [];

  currenttagsArray?.forEach((cat) => {
    const getCat = tagList.find((x) => x.title === cat);
    getCat && tagsArr.push(getCat);
  });
  return tagsArr; //dsfds
};

export default converToCurrentTags;
