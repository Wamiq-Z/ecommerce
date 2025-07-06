export interface User {
    id?: number;
    firstName: string;
    lastName:string;
    password:string
    email: string;
    age?: number;
    isAdmin?: boolean;
    createdAt?: Date;
  }
  