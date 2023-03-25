import React, { useState } from 'react';

const POAPStatus: React.FC = () => {
  const [isPOAPHolder, setIsPOAPHolder] = useState<boolean>(true);

  // Toggle const should be substituted with the POAP api call 
  const togglePOAPHolder = () => {
    setIsPOAPHolder(!isPOAPHolder);
  };

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