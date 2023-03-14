import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <div className="mx-auto  text-center">
      <div className="text-9xl font-bold text-red-500">POAPcet</div>

      <ConnectButton />

      {isConnected && (
        <div className="h-screen grid items-center">
          <Attestooooooor />
        </div>
      )}
    </div>
  );
}
