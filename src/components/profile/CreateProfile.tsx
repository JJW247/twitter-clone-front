import axios from 'axios';
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
} from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { MeContext } from '../../contexts/meContext';

import { useInput } from '../../hooks';
import { IProfile } from '../../interfaces';
import { toastError } from '../../utils';

interface CreateProfileProps {
  profileMutate: (
    data?: IProfile | Promise<IProfile> | MutatorCallback<IProfile> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<IProfile | undefined>;

  setIntroduceToggle?: Dispatch<SetStateAction<boolean>>;
  initIntroduce?: string;
}

const CreateProfile: FC<CreateProfileProps> = ({
  profileMutate,
  setIntroduceToggle,
  initIntroduce,
}) => {
  const token = localStorage.getItem('token');

  const { me } = useContext(MeContext);

  const [introduce, onChangeIntroduce, setIntroduce] = useInput(initIntroduce);

  const onSubmitIntroduce = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/users/introduce`,
        {
          introduce,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        if (setIntroduceToggle) {
          setIntroduceToggle(false);
          setIntroduce(introduce);
        }
        profileMutate();
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  return (
    <form className="mx-4 mb-4 mt-2" onSubmit={onSubmitIntroduce}>
      <input
        className="w-full focus:outline-none border-b-1 border-gray-200 py-1"
        type="text"
        placeholder="Write your introduce!"
        value={introduce}
        onChange={onChangeIntroduce}
      />
      <input
        className={`rounded-full px-2 py-1 font-black text-white text-xs mt-2 ${
          introduce ? 'bg-black' : 'bg-gray-300'
        }`}
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default CreateProfile;
