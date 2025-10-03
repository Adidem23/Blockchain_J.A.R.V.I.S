// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract User{

struct oneUser{
    uint256 userId;
    string  userName;
    string  userQuery;
    address userWalletAddress;

}

mapping(address => oneUser) public  users;

event UserRegistered(address indexed user, string name);

 function registerUser(uint256 _userId,string memory _userName, string memory _userQuery,address _userWalletAddress) public {
        require(bytes(_userName).length > 0, "Name cannot be empty");
        require(bytes(users[_userWalletAddress].userName).length == 0, "User already registered");

        users[_userWalletAddress] = oneUser(_userId, _userName, _userQuery,_userWalletAddress);

        emit UserRegistered(_userWalletAddress,_userName);
    }


    function getUser(address _user) public view returns (string memory, address) {
        oneUser memory u = users[_user];
        return (u.userName, u.userWalletAddress);
    }


}