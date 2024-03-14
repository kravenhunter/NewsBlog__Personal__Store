import { useVuelidate } from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';

import type { IFormData } from '@/types/IFormData';

// Notes
//alpha - Принимает только символы алфавита.
// numeric - только цифры
// alphanumerics - Принимает только буквенно-цифровые символы
// ipAddress
// macAddress
// sameAs - сравнение

/* export const stateForm = reactive({
  userName: '',
  emailUser: '',
  password: {
    password: '',
    confirm: '',
  },
}); */
// const stateFormData = useStateForm();

const alphabetRegex = helpers.regex(/^[^!@#№%^&*_+]+$/); // (/^[a-zA-Z]*$/)
const alphabetNumbers = helpers.regex(/^[^A-Za-z!@#№%^&*,_+]+$/); // numeric
const minLengthLimit = (number: number) =>
  helpers.withMessage(`Минимальная длина: ${number} символа`, minLength(number));

export const validateTestHelper = (state: IFormData) => {
  const rules = computed(() => {
    return {
      userName: {
        required: helpers.withMessage('userName cannot be empty', required),
        regexField: helpers.withMessage('Только слова, цифры и символы: () , $', alphabetRegex),
        minLength: minLengthLimit(3),
      },
      emailUser: {
        required: helpers.withMessage('emailUser  cannot be empty', required),
        regexField: helpers.withMessage(' Не соответствует формату', email),
      },
      password: {
        password: {
          required,
          minLength: minLength(4),
        },
        confirm: {
          required,
          sameAs: sameAs(state.password.password),
        },
      },

      /*       contact: {
          email: { required, email } // Matches state.contact.email
        } */
    };
  });

  const validate = useVuelidate(rules, state);
  return validate;
};
