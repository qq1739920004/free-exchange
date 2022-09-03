interface User{
  id: number;
  name: string;
  avatarUrl: string;
}

export interface commentType{
  id: number;
  content: string;
  comment_id?: string | number;
  createAt: string;
  updateAt: string;
  giveCount: number;
  isGive?: string | number;
  children?: childrenType;
  user: User;
}


interface childrenType{
  id: number;
  user: User;
  belong: number;
  toUser: string;
  content: string;
  giveCount: number;
  createTime: string;
  toContentId: number;
}
