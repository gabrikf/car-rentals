export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
