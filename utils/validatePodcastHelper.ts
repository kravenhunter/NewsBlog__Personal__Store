import { useVuelidate } from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";

interface IPodcastData {
  title: string;
  description: string;
}
const alphabetRegex = helpers.regex(/^[^!@#№%^&*_+]+$/); // (/^[a-zA-Z]*$/)

const minLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, minLength(number));
const maxLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, maxLength(number));

export const validatePodcastHelper = (statePodcast: IPodcastData) => {
  const rules = computed(() => {
    return {
      title: {
        required: helpers.withMessage("Title cannot be empty", required),
        regexField: helpers.withMessage("Только слова, цифры и символы: () , $", alphabetRegex),
        minLength: minLengthLimit(3),
        maxLength: maxLengthLimit(120),
      },
      description: {
        required: helpers.withMessage("Body cannot be empty", required),
        regexField: helpers.withMessage("Только слова, цифры и символы: () , $", alphabetRegex),
        minLength: minLengthLimit(3),
      },
    };
  });

  const validate = useVuelidate(rules, statePodcast);
  return validate;
};
