import React, { FC } from 'react';

export interface CardProps {
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

const Card: FC<CardProps> = () => {
  return <div>Card</div>;
};

export default Card;
