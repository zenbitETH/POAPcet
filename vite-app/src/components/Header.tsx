import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Logo from '../Public/banner.png';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const goToManageFaucet = () => {
    navigate('/manage');
  };
  

  return (
    <div className="fixed top-0 py-3 w-full flex justify-between items-center">
      <a href='/'><img className="mx-5" width={250} src={Logo} alt="" /></a>
      <div className="mx-5 flex gap-10">
        {isConnected && (
          <div
            onClick={goToManageFaucet}
            className="
              px-5 py-2 bg-red-500/50 rounded-2xl
              text-2xl font-bold text-white
              hover:text-black hover:bg-red-500 cursor-pointer
              hover:scale-105 hover:drop-shadow-lg transition-all
              duration-200 ease-in-out"
          >
            Manage
          </div>
        )}

        <ConnectButton />
      </div>
    </div>
  );
}