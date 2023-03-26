import { encodeRawKey, stringifyAttestationBytes } from '@eth-optimism/atst';
import { BigNumber, ethers } from 'ethers';
import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import {
  useAttestationStationAttest,
  usePrepareAttestationStationAttest,
  useAttestationStationAttestations,
  poaPcetABI
} from '../generated';

interface FormData {
  name: string;
  description: string;
  network: string;
  poapId: number;
  duration: number;
  participants: number;
  faucetAmount: number;
  attestationName: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  network: '',
  poapId: 0,
  duration: 0,
  participants: 0,
  faucetAmount: 0,
  attestationName: '',
};


const networks = ['Optimism Goerli', 'Gnosis testnet', 'Goerli'];

const ManageFaucet: React.FC = () => {
  const [hasFaucet, setHasFaucet] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState<number>(1);
  const { address } = useAccount();
  const contractAddress = "0x2b251Df91A1da87102e932075c304088dB0F926B";

  const contractWrite1 = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: poaPcetABI,
    functionName: 'createFaucet',
    args: [formData.name, formData.description, formData.network, BigNumber.from(formData?.poapId), BigNumber.from(formData?.duration), BigNumber.from(formData?.participants), BigNumber.from(formData?.faucetAmount), BigNumber.from("100000000")],
  })
  const contractWrite2 = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: poaPcetABI,
    functionName: 'deposit',
    overrides: {
      value: ethers.utils.parseUnits((formData?.faucetAmount + 100000000).toString(), "gwei")
    }
  })

  const key = encodeRawKey(formData.attestationName);
  const newAttestation = stringifyAttestationBytes(formData.attestationName);

  const { config } = usePrepareAttestationStationAttest({
    args: [address!, key, newAttestation],
  });

  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => console.log("success")
    ,
  });

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, address!, key],
  });

  console.log(attestation);
  

  /**
   * Wagmi hook to wait for the transaction to be complete
   * @see https://wagmi.sh/docs/hooks/useWaitForTransaction
   */
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  });

  console.log(data);
  

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: keyof FormData
  ) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleSubmit = async () => {
    // Do something with the form data, e.g., create a faucet
    console.log(formData);
    await contractWrite1.write();
    await contractWrite2.write();
    await write?.();
    setHasFaucet(true);
  };

  const handleUpdate = () => {
    // Do something with the updated form data, e.g., update the faucet
    console.log(formData);
  };

  if (hasFaucet) {
    // ManageFaucet state
    return (
      <div className='text-center grid items-center h-screen mx-auto'>
        <div>
          <h2>Deployed faucet</h2>
          <p>Name: {formData.name}</p>
          <p>Description: {formData.description}</p>
          <p>Network: {formData.network}</p>
          <p>POAP ID: {formData.poapId}</p>
          <p>Duration / days left: {formData.duration}</p>
        </div>

        <div>
          <h2>Usage</h2>
          <p>Total users: {/* Fetch total users */}</p>
          <p>Amount per user: {formData.faucetAmount}</p>
          <p>Users that have claimed funds: {/* Fetch claimed users */}</p>
          <p>Amount claimed: {/* Fetch claimed amount */}</p>
        </div>



        <div className='flex gap-5 mx-auto'>
          <div>
            <div>Users</div>
            <input
              type="number"
              placeholder="New number of users"
              value={formData.participants}
            />
          </div>

          <div>
            <div>Amount</div>
            <input
              type="number"
              placeholder="New faucet amount per user"
              value={formData.faucetAmount}
              onChange={(e) => handleInputChange(e, 'faucetAmount')}
            />
          </div>

          <div>
            <div>POAP id</div>
            <input
              type="number"
              placeholder="New POAP ID"
              value={formData.poapId}
              onChange={(e) => handleInputChange(e, 'poapId')}
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>



      </div>

    );
  } else {
    // NoFaucet state
    return (
      <div className='text-center grid items-center h-screen mx-auto'>
        <form onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className='manageForm'>
              <h2>Step 1 - General info</h2>
              <input
                type="text"
                placeholder="Faucet name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'description')}
              />
              <select
                value={formData.network}
                onChange={(e) => handleInputChange(e, 'network')}
              >
                <option value="">Select a network</option>
                {networks.map((network) => (
                  <option key={network} value={network}>
                    {network}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 2 && (
            <div className='manageForm'>
              <h2>Step 2 - Onboarding setting</h2>
              <div className='flex gap-5 items-center'>
                <div className='w-32'>POAPid</div>
                <input
                  type="number"
                  placeholder="POAP ID"
                  value={formData.poapId}
                  onChange={(e) => handleInputChange(e, 'poapId')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='w-32'>Duration</div>
                <input
                  type="number"
                  placeholder="Duration in days"
                  value={formData.duration}
                  onChange={(e) => handleInputChange(e, 'duration')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='w-32'># Participants</div>
                <input
                  type="number"
                  placeholder="Number of participants"
                  value={formData.participants}
                  onChange={(e) => handleInputChange(e, 'participants')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='w-32'>Amount</div>
                <input
                  type="number"
                  placeholder="Faucet amount"
                  value={formData.faucetAmount}
                  onChange={(e) => handleInputChange(e, 'faucetAmount')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='w-32'>Atestation</div>
                <input
                  type="text"
                  placeholder="Attestation Name"
                  value={formData.attestationName}
                  onChange={(e) => handleInputChange(e, 'attestationName')}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='manageForm'>
              <h2>Step 3 - Confirm Settings</h2>
              <p>Name: {formData.name}</p>
              <p>Description: {formData.description}</p>
              <p>Network: {formData.network}</p>
              <p>POAP ID: {formData.poapId}</p>
              <p>Attestation name: {formData.attestationName}</p>
              <p>Number of participants: {formData.participants}</p>
              <p>Faucet amount: {formData.faucetAmount}</p>
              <p>
                Total amount for the faucet: {formData.participants * formData.faucetAmount}
              </p>
            </div>
          )}
          <div className='mt-5'>
            {step > 1 && (
              <button className='bg-gray-200' type="button" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 3 && (
              <button className='bg-gray-200' type="button" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
            {step === 3 && <button className='bg-gray-200' onClick={handleSubmit}>Submit</button>}
          </div>
        </form>
      </div>
    );
  }
};

export default ManageFaucet;