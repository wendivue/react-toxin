type UserInfoProps = {
  name: string;
  surname: string;
  onNameChange?: (newName: string) => void;
  onSurnameChange?: (newSurname: string) => void;
};

export type { UserInfoProps };
