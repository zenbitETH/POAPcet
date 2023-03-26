import React, { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

const POAPStatus: React.FC = () => {
  const [isPOAPHolder, setIsPOAPHolder] = useState<boolean>(true);
  const { address } = useAccount();
  // Toggle const should be substituted with the POAP api call 
  const togglePOAPHolder = () => {
    setIsPOAPHolder(!isPOAPHolder);
  };

  // const contractRead = useContractRead({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: wagmigotchiABI,
  //   functionName: 'getHunger',
  // })

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     'x-api-key': 'aS431lJmSTnSD0Gqk43vwh7TonWFW8gZW9MNtvAhgQyMMZLFE3taXw6njkOeVTG6Sk3LpjzmlAC8GURfFIbEGx7M8kPFu5HOf0eOi6wY1MMc7isCJHGrW6gBe3HAoG6f'
  //   }
  // };
  
  // fetch(`https://api.poap.tech/actions/scan/${address}/111529`, options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

  return (
    <div className="text-center" onClick={togglePOAPHolder}>
      {isPOAPHolder ? (
        <div className='border border-green-500 rounded-2xl max-w-2xl mx-auto h-96 grid items-center'>
          <div className="text-green-600">You are holding the POAP, claim your test funds!</div>
          <button className='bg-gray-200 rounded-2xl hover:bg-green-500 hover:text-white py-2 px-4 mx-auto'> Claim test funds</button>
        </div>
      ) : (
        <div className="text-red-600">
          Sorry, you are not holding the POAP
        </div>
      )}
    </div>
  );
};

export default POAPStatus;