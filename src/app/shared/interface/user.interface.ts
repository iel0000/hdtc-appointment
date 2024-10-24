export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  token?: string;
  role: string[];
  branchId: number;
  lastLogin: string;
}
