import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../Public/banner.png"


export function Header() {
    return (
        <div className="fixed top-0 py-3 w-full flex justify-between items-center">
            <img className="mx-5" width={250} src={Logo} alt=""/>
            <div className="mx-5 flex gap-10">
                <div className="px-5 py-2 bg-red-500/50 rounded-2xl text-2xl font-bold text-white hover:text-black hover:bg-red-500 cursor-pointer hover:scale-105 hover:drop-shadow-lg transition-all duration-200 ease-in-out">Manage</div>
                <ConnectButton />
            </div>
        </div>
    )
}