type FormErrorProps = {
  formError: Errors;
};

type Errors = {
  [key: string]: { [key: string]: boolean };
};

type FormErrorKey = string;

export type { FormErrorProps, Errors, FormErrorKey };
