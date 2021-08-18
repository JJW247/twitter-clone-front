export interface ITweet {
  id: number;
  createdAt: Date;
  tweet: string;
  users: {
    id: number;
    nickname: string;
  };
}
