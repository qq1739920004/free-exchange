interface User{
  id: number;
  name: string;
  avatar: string;
}

export interface getmoments{
  id: number;
  title: string;
  ct: string;
  isCollection?:string | number;
  isGive?:string | number;
  createAt: string;
  updateAt: string;
  mainLabel?:string
  user: User;
  comentCount: number;
  labelCount: number;
  giveCount: number;
  collectionCount: number;
  label?: string[];
  images?: string[];
  cover?:string;
  content?:string
}
