// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Greeter{
    string greeting = "Hello";
    function greet() public view returns( string memory ) {
        return greeting;
    }
    function setGreeting(string memory _greeting) public returns(bool) {
        greeting = _greeting;
        return true;
    }
}