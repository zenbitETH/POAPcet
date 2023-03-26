import React, { useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { poaPcetABI } from '../generated';
import POAPcet from '../Public/poapcet.png'

const POAPStatus: React.FC = () => {
  const [isPOAPHolder, setIsPOAPHolder] = useState<boolean>(false);
  const { address } = useAccount();
  // Toggle const should be substituted with the POAP api call 
  const togglePOAPHolder = () => {
    setIsPOAPHolder(!isPOAPHolder);
  };
  const contractAddress = "0x2b251Df91A1da87102e932075c304088dB0F926B";

  const contractRead = useContractRead({
    address: contractAddress,
    abi: poaPcetABI,
    functionName: "poapID",
  })

  const contractWrite1 = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: poaPcetABI,
    functionName: 'drip',
    args: [`0x${address?.substring(2,42).toString()}`],
    onError(error){alert("The address has already claimed funds!")}
  })
  
  const claimFunds = async () => {
    const tx = await contractWrite1.write();
    console.log(tx);
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': 'aS431lJmSTnSD0Gqk43vwh7TonWFW8gZW9MNtvAhgQyMMZLFE3taXw6njkOeVTG6Sk3LpjzmlAC8GURfFIbEGx7M8kPFu5HOf0eOi6wY1MMc7isCJHGrW6gBe3HAoG6f'
    }
  };

  fetch(`https://api.poap.tech/actions/scan/${address}/${contractRead.data?.toNumber()}`, options)
    .then(response => response.json())
    .then(response => {
      response.statusCode === 404 ? setIsPOAPHolder(false) : setIsPOAPHolder(true)
    })
    .catch(err => console.error(err));

  return (
    <div className="text-center">
      {isPOAPHolder ? (
        <div className='border border-green-500 rounded-2xl max-w-3xl mx-auto h-96 grid items-center'>
          <div className=''><img className="mx-auto" width={200} src={POAPcet} alt="" /></div>
          <div className="text-green-600 text-xl">You are holding the POAP 111529, claim your test funds on <span className='text-red-500'>Optimism Goerli</span>!</div>
          <button className='bg-gray-200 rounded-2xl hover:bg-green-500 hover:text-white py-2 px-4 mx-auto' onClick={() => claimFunds()}> Claim test funds</button>
        </div>
      ) : (
        <div className="text-red-600 text-5xl">
          Sorry, you are not holding the POAP or you have not claim it yet
        </div>
      )}
    </div>
  );
};

export default POAPStatus;