// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract POAPcet is Ownable, AccessControl {
    bytes32 public constant ROLE_A = keccak256("member");

    string public eventName;
    string public description;
    string public network;
    string public attestation;
    uint256 public poapID;
    uint256 public duration;
    uint256 public participants;
    uint256 public dripAmount;
    uint256 public funds;
    uint256 public gas;
    uint256 public amount;
    address[] public members;
    mapping(address => bool) private claimed;

    event Deposit(address indexed depositor, uint256 amount);
    event FundsDispensed(address indexed recipient, uint256 amount);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createFaucet(
        string memory _eventName,
        string memory _description,
        string memory _network,
        uint256 _poapID,
        uint256 _duration,
        uint256 _participants,
        uint256 _funds,
        uint256 _gas
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        eventName = _eventName;
        description = _description;
        network = _network;
        poapID = _poapID;
        duration = _duration;
        participants = _participants;
        funds = _funds;
        gas = _gas;
        amount = _funds / _participants;
        amount = amount * 1000000000;
    }

    function updateFaucet(
        string memory _eventName,
        string memory _description,
        string memory _network,
        uint256 _poapID,
        uint256 _duration,
        uint256 _participants,
        uint256 _funds,
        uint256 _gas
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        eventName = _eventName;
        description = _description;
        network = _network;
        poapID = _poapID;
        duration = _duration;
        participants = _participants;
        funds = _funds;
        gas = _gas;
    }

    function grantMemberRole() public {
        // to be called if the user has the POAP
        grantRole(ROLE_A, msg.sender);
    }

    function drip(address _address) public {
        require(!claimed[_address], "Address has already claimed funds.");
        require(address(this).balance >= amount, "Faucet is out of funds.");
        require(hasRole(ROLE_A, _address), "Don't have the member Role");
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _address) ||
                getRoleMemberCount() < participants,
            "Faucet limit has been reached."
        );

        payable(_address).transfer(amount);
        claimed[_address] = true;

        emit FundsDispensed(msg.sender, amount);
    }

    function getRoleMemberCount() public view returns (uint256 count) {
        // length of the members
        return members.length;
    }

    function deposit() public payable { }

    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance.");
        payable(owner()).transfer(_amount);
    }
}
