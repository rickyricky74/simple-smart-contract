// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PayMachine  {
   
    event TransferEth(address indexed sender, address indexed recipient, uint256 amount);
    event TransferToken(address indexed tokenAddress, address indexed sender, address indexed recipient, uint256 amount);

    function transferEth(address payable _recipient) public payable {
        require(_recipient != address(0), "PayMachine: Canont transfer to the zero address");
        require(msg.value > 0, "PayMachine: Cannot transfer 0 ether");
        (bool transferEthOkay, ) = _recipient.call{value: msg.value}("");
        require(transferEthOkay, "PayMachine: Failed to send ether");
        emit TransferEth(_msgSender(), _recipient, msg.value);
    }

    function transferToken(address _tokenAddress, address payable _recipient, uint256 _amount) public {
        IERC20 token = IERC20(_tokenAddress);
        require(token.balanceOf(_msgSender()) > _amount, "PayMachine: Cannot transfer more than the balance of the sender");
        require(_recipient != address(0), "PayMachine: Canont transfer to the zero address");
        (bool transferTokenOkay) = token.transferFrom(_msgSender(), _recipient, _amount);
        require(transferTokenOkay, "PayMachine: Failed to send token");
        emit TransferToken(_tokenAddress, _msgSender(), _recipient, _amount);
    }

    function _msgSender() internal view returns (address) {
        return msg.sender;
    }

}
