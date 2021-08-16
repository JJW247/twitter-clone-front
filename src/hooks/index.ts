import { ChangeEvent, useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  return [value, onChange];
};
