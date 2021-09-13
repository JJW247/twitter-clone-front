import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { MeContext } from '../../contexts/meContext';
import { useGetProfileImage } from '../../hooks/useGetProfileImage';
import MenuList from './MenuList';
import ProfileIcon from './ProfileIcon';

interface HamburgerMenuProps {
  title: string;
  setHamburgerToggle: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({
  title,
  setHamburgerToggle,
}) => {
  const { me } = useContext(MeContext);
  const { data } = useGetProfileImage(me);
  console.log(data);
  return (
    <div className="fixed top-0 w-full min-h-screen bg-black bg-opacity-50 z-10">
      <div className="w-5/6 bg-white min-h-screen px-4">
        <div className="flex justify-between pt-4 mb-4">
          <div className="font-black">{title}</div>
          <button onClick={() => setHamburgerToggle(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div>
          <ProfileIcon userId={me} />
          <div className="ml-4 font-bold">{data?.nickname}</div>
        </div>
        <div className="flex">
          <div className="w-24">Followers</div>
          <div className="ml-4">123</div>
        </div>
        <div className="flex">
          <div className="w-24">Followings</div>
          <div className="ml-4">123</div>
        </div>
        <MenuList />
      </div>
    </div>
  );
};

export default HamburgerMenu;
