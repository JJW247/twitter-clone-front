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

export interface IProfile {
  id: number;
  nickname: string;
  introduce: string;
  followers: { id: number }[];
  followings: { id: number }[];
  tweets: { id: number }[];
}
