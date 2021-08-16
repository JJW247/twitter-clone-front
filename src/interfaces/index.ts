export interface ITweet {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  tweet: string;
  user: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    nickname: string;
  };
}
