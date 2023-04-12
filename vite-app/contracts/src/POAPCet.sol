// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract POAPcet is Ownable {

    uint256 faucetId = 0;

    struct faucet {
        uint256 faucetId;
        uint256 creationDate;
        string eventName;
        string description;
        string network;
        string attestation;
        uint256 poapId; // Manager should know this Id number
        uint256 participants;
        uint256 funds; // 10 eth for example
        uint256 remainingAmount; // decrease everytime the drip() function has been called
        uint256 gas; // we need to find a way to calculate
        uint256 amount; // the maximum one user can claim for test
    }

    faucet [] faucets;

    mapping(address => bool) claimed;
    mapping(uint256 => address) faucetOwner;
    mapping(uint256 => faucet) faucetById;
    mapping(address => faucet[]) userFaucets;
    mapping(uint256 => address payable[]) members;

    event Deposit(address indexed depositor, uint256 amount);
    event FundsDispensed(address indexed recipient, uint256 amount);

    function deposit() public payable { }

    function createFaucet(
        string memory _eventName,
        string memory _description,
        string memory _network,
        string memory _attestation,
        uint256 _poapId,
        uint256 _participants,
        uint256 _gas
    ) public payable {
        uint256 _amountPerUser = msg.value / _participants;
        faucet memory newFaucet = faucet(faucetId, block.timestamp, _eventName, _description, _network, _attestation, _poapId,
                                        _participants, msg.value, msg.value, _gas, _amountPerUser);
        faucets.push(newFaucet);
        faucetById[faucetId] = newFaucet;
        faucetOwner[faucetId] = msg.sender;
        faucetId++;
    }


    // Only the person who created the selected Faucet can update the faucet
    // We need to also track how much amount the faucet has / remained in it for the user who created the faucet 
    // if there are funds left, can the manager of the faucet withdraw it
    // set a close event function to claim back the remaining funds if there are any
    // function updateFaucet(
    //     uint256 _faucetId,
    //     string memory _eventName,
    //     string memory _description,
    //     uint256 _participants,
    //     uint256 _funds,
    //     uint256 _gas
    // ) public {
    //     require(faucetOwner[_faucetId] == msg.sender, "You are not the owner of this Poap");

    //     faucets[_faucetId].eventName = _eventName;
    //     faucets[_faucetId].description = _description;
    //     faucets[_faucetId].participants = _participants;
    //     faucets[_faucetId].funds = _funds;
    //     faucets[_faucetId].gas = _gas;
    // }

    // This is the function where actually the participants can claim their funds from the contract
    function drip(uint256 _id) public {
        require(!claimed[msg.sender], "Address has already claimed funds");
        require(faucetOwner[_id] != msg.sender, "Manager cannot drip from a faucet");
        uint256 fundsAmount = getAmountByFaucetId(_id);
        require(address(this).balance >= fundsAmount, "Faucet is out of funds");
        require(members[_id].length <= faucets[_id].participants, "This faucet has reached the max users");

        members[_id].push(payable(msg.sender));
        payable(msg.sender).transfer(fundsAmount);
        claimed[msg.sender] = true;
        faucets[_id].remainingAmount -= fundsAmount;

        emit FundsDispensed(msg.sender, fundsAmount);
    }

    function getAmountByFaucetId(uint256 _id) public view returns (uint256){
        return faucets[_id].amount;
    }

    function listFaucets()public view returns (faucet[] memory){
        return faucets;
    }

    function getRemainingAmountOfFaucet(uint256 _id) public view returns(uint){
        return faucets[_id].remainingAmount;
    }

    function listFaucetById(uint256 id) public view returns (faucet memory){
        return faucetById[id];
    }

    // This is the manager part where the manager can withdraw if there is any remaining balance in the faucet
    function withdraw(uint256 _id) public {
        // Do we set a requirity here when the gien faucet should be able to be withdrawn? Like when the time has run out or something?
        require(faucetOwner[_id] == msg.sender, "You are not the owner of this faucet");
        uint256 claimableFunds = getRemainingAmountOfFaucet(_id);
        payable(msg.sender).transfer(claimableFunds);
    }

    function getDate() public view returns(uint256){
        uint256 currentDate = block.timestamp;
        return currentDate;
        // This is going to be how to calculate a 1 week activation for each faucet

        // require(currentDate - creationDate < 604800, "This faucet is inactive now")
    }

    function safeWithdraw(uint256 _amount) public onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    function getMembers(uint256 _id) public view returns (address payable[] memory) {
        return members[_id];
    }
    // We also need to check if each participants has the POAP or not, if they don't then they are getting the "sorry" page, if yes then they can claim the test Funds. 
}
