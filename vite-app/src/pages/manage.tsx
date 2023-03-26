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


const networks = ['Optimism Mainnet', 'Optimism Goerli'];

const ManageFaucet: React.FC = () => {
  const [hasFaucet, setHasFaucet] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState<number>(1);
  const { address } = useAccount();
  const contractAddress = "0x9a8372De77E04651910d7a53B0930b2813AE416C";

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
      <div className='text-center grid items-center h-screen mx-auto font-kan'>
        <div className='text-center mx-auto border border-2 border-red-500 max-w-4xl p-10 rounded-2xl'>
          <div className='text-3xl'>Manage your faucet</div>
          <div className='flex text-left gap-5 items-center my-3'>
            <div className='text-sm'>Name: </div>
            <div className='text-2xl text-red-500'>{formData.name}</div>
          </div>
          <div className='flex text-left gap-3 items-center my-3'>
            <div className='text-sm'>Description: </div>
            <div className='text-2xl text-red-500'>{formData.description}</div></div>
          <div className='flex text-left gap-3 items-center my-3'>
            <div className='text-sm'>Network: </div>
            <div className='text-2xl text-red-500'>{formData.network}</div>
          </div>
          <div className='flex text-left gap-3 items-center my-3'>
            <div className='text-sm'>POAP ID: </div>
            <div className='text-2xl text-red-500'> {formData.poapId}</div>
          </div>
          <div className='flex text-left gap-3 items-center'>
            <div className='text-sm'>Duration / days left:</div>
            <div className='text-2xl text-red-500'>{formData.duration}</div>
          </div>
          <div className='flex text-left gap-3 items-center'>
            <div className='text-sm'>Total users:</div>
            <div className='text-2xl text-red-500'>{/* Fetch total users */}</div>
          </div>
          <div className='flex text-left gap-3 items-center'>
            <div className='text-sm'>Amount per user:</div>
            <div className='text-2xl text-red-500'>{formData.faucetAmount}</div>
          </div>
          <div className='flex text-left gap-3 items-center'>
            <div className='text-sm'>Users that have claimed funds:</div>
            <div className='text-2xl text-red-500'>{/* Fetch claimed users */}</div>
          </div>
          <div className='flex text-left gap-3 items-center'>
            <div className='text-sm'>Amount claimed:</div>
            <div className='text-2xl text-red-500'>{/* Fetch claimed amount */}</div>
          </div>
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
          <button className='bg-gray-200' onClick={handleUpdate}>Update</button>
        </div>



      </div>

    );
  } else {
    // NoFaucet state
    return (
      <div className='text-center grid items-center h-screen mx-auto font-kan'>
        <form onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className='manageForm'>
              <div className='text-2xl' >Step 1 - General info</div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'>Faucet Name</div>
                <input
                  className='w-full'
                  type="text"
                  placeholder="MyTestingProject"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              </div> 
              <div className='flex gap-5 items-center'>
                <div className='inTags'>Description</div>
                <input
                  className='w-full'
                  type="text"
                  placeholder="Describe the purpose of your faucet"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                />
              </div>
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
              <div className='text-2xl' >Step 2 - Faucet setting</div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'>POAPid</div>
                <input
                  type="number"
                  placeholder="POAP ID"
                  value={formData.poapId}
                  onChange={(e) => handleInputChange(e, 'poapId')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'>Duration (days)</div>
                <input
                  type="number"
                  placeholder="Duration in days"
                  value={formData.duration}
                  onChange={(e) => handleInputChange(e, 'duration')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'># Participants</div>
                <input
                  type="number"
                  placeholder="Number of participants"
                  value={formData.participants}
                  onChange={(e) => handleInputChange(e, 'participants')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'>Funds + Gas Fees</div>
                <input
                  type="number"
                  placeholder="Faucet amount"
                  value={formData.faucetAmount}
                  onChange={(e) => handleInputChange(e, 'faucetAmount')}
                  className="w-full"
                />
              </div>
              <div className='flex gap-5 items-center'>
                <div className='inTags'>Atestation</div>
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
              <div className='grid grid-cols-2 gap-5'>
              <div className=' col-span-2 text-2xl text-red-500' >Step 3 - Confirm Settings</div>
                <div className='font-light text-sm text-left'>Name: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.name}</span></div>
                <div className='font-light text-sm text-left'>Network: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.network}</span></div>
                <div className='font-light text-sm text-left col-span-2'>Description: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse '>{formData.description}</span></div>
                <div className='font-light text-sm text-left'>POAP ID: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.poapId}</span></div>
                <div className='font-light text-sm text-left'>Attestation name: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.attestationName}</span></div>
                <div className='font-light text-sm text-left'>Number of participants: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.participants}</span></div>
                <div className='font-light text-sm text-left'>Faucet amount: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.faucetAmount}</span></div>
                <div className='font-light text-sm text-left'>
                  Total amount for the faucet: <span className='px-2 text-xl text-red-500 w-full rounded-2xl animate-pulse'>{formData.participants * formData.faucetAmount}</span>
                </div>
              </div>
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