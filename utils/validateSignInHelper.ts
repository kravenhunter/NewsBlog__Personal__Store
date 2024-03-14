import { useVuelidate } from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';

interface ISignInData {
  userNameField: string;
  emailField: string;
  passwordField: string;
  confirmPasswordField: string;
}

const alphabetRegex = helpers.regex(/^[^!@#№%^&*_+]+$/); // (/^[a-zA-Z]*$/)

const minLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, minLength(number));

export const validateSignInHelper = (stateSignIn: ISignInData) => {
  const rules = computed(() => {
    return {
      userNameField: {
        required: helpers.withMessage('User Name cannot be empty', required),
        regexField: helpers.withMessage('Только слова, цифры и символы: () , $', alphabetRegex),
        minLength: minLengthLimit(3),
      },
      emailField: {
        required: helpers.withMessage('Email cannot be empty', required),
        regexField: helpers.withMessage(' Не соответствует формату', email),
      },
      passwordField: {
        required,
        minLength: minLength(4),
      },
      confirmPasswordField: {
        required,

        sameAs: helpers.withMessage("Password doesn't equal", sameAs(stateSignIn.passwordField)),
      },
    };
  });

  const validate = useVuelidate(rules, stateSignIn);
  return validate;
};
