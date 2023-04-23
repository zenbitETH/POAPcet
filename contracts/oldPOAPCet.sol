// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/access/AccessControl.sol";

// contract POAPcet is Ownable, AccessControl {
//     bytes32 public constant ROLE_A = keccak256("member");

//     // This contract will need to be connected with DeCo, to check whether the participants have for example minted some business NFTs
//     // First step is going to be made the tempalte contract
//     // This project will need to be done on Optimism_Göerli
//     // If multiple faucets can be created, we need to define a struct, that will allow us to have more faucets active, not just one

//     // 2 weeks on contract 
//     // 2 weeks on UI / Frontend
//     // 1 Month to complete the template version and the DeCo as well
//     // Can consider 2-3 weeks more for the DeCo implementation
//     // 

//     string public eventName;
//     string public description;
//     string public network;
//     string public attestation;
//     uint256 public poapID;
//     uint256 public duration;
//     uint256 public participants;
//     uint256 public dripAmount;
//     uint256 public funds;
//     uint256 public gas;
//     uint256 public amount;
//     address[] public members;
//     mapping(address => bool) private claimed;

//     event Deposit(address indexed depositor, uint256 amount);
//     event FundsDispensed(address indexed recipient, uint256 amount);

//     constructor() {
//         _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
//     }

//     // createFaucet function should be only be called via anyone
//     // So the onlyRole should be deleted 
//     // 
//     function createFaucet(
//         string memory _eventName,
//         string memory _description,
//         string memory _network,
//         uint256 _poapID,
//         uint256 _duration,
//         uint256 _participants,
//         uint256 _funds,
//         uint256 _gas
//     ) public onlyRole(DEFAULT_ADMIN_ROLE) {
//         eventName = _eventName;
//         description = _description;
//         network = _network;
//         poapID = _poapID;
//         duration = _duration; // Its for the counter, its only available for a time, 1 week, it needs to be set in the contract, 
//         // Vera need to be reviewed whether it should be popped on/off or set for 1 week for example
//         participants = _participants;
//         funds = _funds;
//         gas = _gas; // This is needed to added to the amount because the users will not pay for gases, so this is a sum+ for the final amount we are going to distribute among the users
//         // We need to find a way for calculation as. This should be checked on Etherscan
//         amount = _funds / _participants;
//         amount = amount * 1000000000;
//     }


//     // Only the person who created the selected Faucet can update the faucet
//     // We need to also track how much amount the faucet has / remained in it for the user who created the faucet 
//     // if there are funds left, can the manager of the faucet withdraw it
//     // set a close event function to claim back the remaining funds if there are any
//     function updateFaucet(
//         string memory _eventName,
//         string memory _description,
//         string memory _network,
//         uint256 _poapID,
//         uint256 _duration,
//         uint256 _participants,
//         uint256 _funds,
//         uint256 _gas
//     ) public onlyRole(DEFAULT_ADMIN_ROLE) {
//         eventName = _eventName;
//         description = _description;
//         network = _network;
//         poapID = _poapID;
//         duration = _duration;
//         participants = _participants;
//         funds = _funds;
//         gas = _gas;
//     }

//     function grantMemberRole() public {
//         // to be called if the user has the POAP
//         grantRole(ROLE_A, msg.sender);
//     }


//     // This is the function where actually the participants can claim their funds from the contract
//     function drip(address _address) public {
//         require(!claimed[_address], "Address has already claimed funds.");
//         require(address(this).balance >= amount, "Faucet is out of funds.");
//         require(
//             hasRole(DEFAULT_ADMIN_ROLE, _address) ||
//                 getRoleMemberCount() < participants,
//             "Faucet limit has been reached."
//         );

//         payable(_address).transfer(amount);
//         claimed[_address] = true;

//         emit FundsDispensed(msg.sender, amount);
//     }

//     function getRoleMemberCount() public view returns (uint256 count) {
//         // length of the members
//         return members.length;
//     }

//     function deposit() public payable { }

//     function readPOAPID() public view returns (uint) {
//         return poapID;
//     }

//     // This is the manager part where the manager can withdraw if there is any remaining balance in the faucet
//     function withdraw(uint256 _amount) public onlyOwner {
//         require(_amount <= address(this).balance, "Insufficient balance.");
//         payable(owner()).transfer(_amount);
//     }

//     // We also need to check if each participants has the POAP or not, if they don't then they are getting the "sorry" page, if yes then they can claim the test Funds. 
// }
