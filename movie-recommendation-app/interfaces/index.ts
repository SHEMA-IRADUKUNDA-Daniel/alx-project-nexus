export interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  rightContent?: React.ReactNode; // extra Tailwind classes to override width, etc.
}

export interface ButtonProp {
  className?: string;
  title?: string;
  onClick: () => void;
}
export type HeaderProps = {
  onLoginClick: () => void;
};

export type SignInModalProps = {
  onClose: () => void;
};
export interface ExtendedSignInModalProps extends SignInModalProps {
  onRegisterClick: () => void;
}
export interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}
