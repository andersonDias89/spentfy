export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  emailVerified?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
