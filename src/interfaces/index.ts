export interface ITweet {
  id: number;
  createdAt: Date;
  tweet: string;
  users: {
    id: number;
    nickname: string;
  };
}

export interface IComment {
  id: number;
  createdAt: Date;
  comment: string;
  users: {
    id: number;
    nickname: string;
  };
}

export interface IFollow {
  id: number;
  follower: {
    id: number;
  };
  following: {
    id: number;
  };
}
