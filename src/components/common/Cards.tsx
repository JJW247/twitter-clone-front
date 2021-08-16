import React, { FC } from 'react';
import { CardProps } from './Card';

interface CardsProps {
  tweets: CardProps[];
}

const Cards: FC<CardsProps> = ({ tweets }) => {
  return (
    <ul>
      {tweets.map((v) => {
        return (
          <li>
            {v.user.nickname} - {v.tweet}
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;
