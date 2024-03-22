import { useVuelidate } from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";

// import type { IPost } from 'types/IPost';

interface IPostData {
  title: string;
  shortBody: string;
  author: string;
}

const alphabetRegex = helpers.regex(/^[^!@#№%^&*_+]+$/); // (/^[a-zA-Z]*$/)

const minLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, minLength(number));
const maxLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, maxLength(number));
export const validatePostHelper = (statePost: IPostData) => {
  const rules = computed(() => {
    return {
      title: {
        required: helpers.withMessage("Title cannot be empty", required),
        regexField: helpers.withMessage("Только слова, цифры и символы: () , $", alphabetRegex),
        minLength: minLengthLimit(3),
        maxLength: maxLengthLimit(120),
      },
      shortBody: {
        required: helpers.withMessage("Body cannot be empty", required),
        regexField: helpers.withMessage("Только слова, цифры и символы: () , $", alphabetRegex),
        minLength: minLengthLimit(3),
        maxLength: maxLengthLimit(700),
      },
      author: {
        required: helpers.withMessage("Author cannot be empty", required),
        regexField: helpers.withMessage("Только слова, цифры и символы: () , $", alphabetRegex),
        minLength: minLengthLimit(3),
        maxLength: maxLengthLimit(40),
      },
    };
  });

  const validate = useVuelidate(rules, statePost);
  return validate;
};
