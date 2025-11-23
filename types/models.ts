
export type Message = {
  id: string;
  text: string;
  createdAt: string;
};

export type Role='USER'|'ADMIN'
export interface User  {
    id: string;
  name?: string | null;
  email?: string | null;
  role?: Role;
};

