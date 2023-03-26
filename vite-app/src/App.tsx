import { useAccount } from "wagmi";
import Carousel from "./components/Carousel";
//import { Attestooooooor } from "./components";
import POAPStatus from "./components/POAPstatus";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <div className="mx-auto text-center h-screen grid items-center font-kan">
      {!isConnected &&<Carousel/>}
      {isConnected && (
        <div className="h-screen grid items-center">
          {/*<Attestooooooor />/*/}
          <POAPStatus/>
        </div>
      )}
    </div>
  );
}
