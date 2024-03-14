import { useVuelidate } from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';

interface ILogInData {
  emailField: string;
  passwordField: string;
}

const minLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, minLength(number));

export const validateLoginHelper = (state: ILogInData) => {
  const rules = computed(() => {
    return {
      emailField: {
        required: helpers.withMessage('Email cannot be empty', required),
        regexField: helpers.withMessage(' Не соответствует формату', email),
      },
      passwordField: {
        required,
        minLength: minLengthLimit(4),
      },
    };
  });

  const validate = useVuelidate(rules, state);
  return validate;
};
