import React, { useState } from 'react';

const POAPStatus: React.FC = () => {
  const [isPOAPHolder, setIsPOAPHolder] = useState<boolean>(true);

  // Example: Toggle the POAP holder status when the component is clicked
  const togglePOAPHolder = () => {
    setIsPOAPHolder(!isPOAPHolder);
  };

  return (
    <div className="text-center" onClick={togglePOAPHolder}>
      {isPOAPHolder ? (
        <div className="text-green-600">
          You are holding the POAP, claim your test funds!
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