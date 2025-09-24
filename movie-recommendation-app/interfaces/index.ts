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

export interface Movie {
  id: number;
  title: string;
  year: number;
  duration: number;
  quality: string;
  image: string;
  likes?: number;
  comments: string[];
}
export interface MovieStore {
  movies: Movie[];
  searchMovie: string;
  setSearchMovie: (search: string) => void;
  likeMovie: (id: number) => void;
  commentMovie: (id: number, comment: string) => void;
  likedMovies: number[];
}

export interface WatchButtonProp {
  title: string;
  className: string;
  onClick: () => void;
}

export type Comment = {
  movieId: number;
  text: string;
};
