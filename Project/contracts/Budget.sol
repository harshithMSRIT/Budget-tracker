// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Budget{
    
    struct Department{
        string name;
        uint amount;
        string message;
        address from;
        uint timestamp;
    }
     Department[] dept; 
     address payable owner;

     constructor(){
        owner = payable(msg.sender);
    }

     function send(string memory name, uint amount, string memory message) external payable{
        require(msg.value>0,"send money");
        owner.transfer(msg.value);
        dept.push(Department(name,amount,message,msg.sender,block.timestamp));
     }

    function get() public view returns(Department[] memory){
        return dept;
    }
}