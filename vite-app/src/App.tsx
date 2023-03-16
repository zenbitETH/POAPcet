import { Header } from "./components";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <div className="mx-auto text-center h-screen grid items-center">
      
      {isConnected && (
        <div className="h-screen grid items-center">
          <Attestooooooor />
        </div>
      )}
    </div>
  );
}
