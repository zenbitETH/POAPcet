# POAPcet

Public good to onboard testing users with POAP as access control

Developed at [Scaling Ethereum 2023](https://ethglobal.com/showcase/poapcet-c0mwf) 

[POAPcet contract on Optimism Mainnet](https://optimistic.etherscan.io/address/0x3E2CE8D4070dC45286fE1Cf4a6759d96e4d88363
)  
[POAPcet contract on Optimism Goerli Testnet](https://goerli-optimism.etherscan.io/address/0x2b251df91a1da87102e932075c304088db0f926b
)  
[POAP event ID 111529](https://poap.gallery/event/111529
)  

## About
This project is a public good to help developers and learning communities onboard testing users to prototypes and pre-productions apps. POAPcet requires users to hold a POAP defined by devs or event organizers in order to deliver a small amount of testnet currencies for gas fees.    

## How it's made

We will build a custom faucet working on a vite app that fetches POAs held by users through POAP API  to enable test funds distribution and attest onboarding users with the Attestation contract on Optimism.

### Built with:

- Optimism Attestation Contract  
- POAP API
- Vite app



### Dev Environment


1. Make `.env` in next-app root folder

```shell
cd vite-app
```

2. Install dependencies

```bash
npm install
```

3. Start developmment

```bash
npm run dev
```

4. 📱 Open http://localhost:5173 to see the app
