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
  nickname: string;
  introduce?: string;
}

export interface IFollowList {
  id: number;
  follower: IFollow;
  following: IFollow;
}

export interface IFollowing {
  id: number;
  follower: IFollow;
}

export interface IFollower {
  id: number;
  following: IFollow;
}

export interface IProfile {
  id: number;
  nickname: string;
  introduce: string;
  followers: { id: number }[];
  followings: { id: number }[];
  tweets: { id: number }[];
}
