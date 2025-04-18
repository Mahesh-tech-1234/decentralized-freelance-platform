// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelancePayment {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event PaymentSent(address indexed from, address indexed to, uint256 amount);

    function payFreelancer(address payable freelancer) public payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        freelancer.transfer(msg.value);
        emit PaymentSent(msg.sender, freelancer, msg.value);
    }
}
