import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import '../src/Styles/index.css'
import { Header } from "./components";
import ManageFaucet from "./pages/manage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { chains, client } from "./wagmi";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/manage" element={<ManageFaucet />} />
          </Routes>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);