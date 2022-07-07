// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


/**
 * @title STOverse AG Shares
 * @author Guillaume Fernandes, guillaume.fernandes@stoverse.ch
 *
 * This is an ERC-20 token representing shares of STOverse AG that are bound to
 * a shareholder agreement that can be found at the URL defined in the constant 'terms'.
 */


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract WrappedShares is ERC20, Pausable, ERC20Wrapper, ERC20Permit, ERC20Votes, Ownable {
    
    string public terms; 

    constructor(IERC20 wrappedToken)
      ERC20("Wrapped STOverse AG Shares", "WSTOV")
      ERC20Permit("Wrapped STOverse")
      ERC20Wrapper(wrappedToken)
    {
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    function setTerms(string memory _term) public onlyOwner {
        terms = _term;
    }

    /**
     * Check ownership until the first LP is open
     */
    function _approve(address sender, address recipient, uint256 amount)
        internal
        virtual
        override
        whenNotPaused {
            super._approve(sender, recipient, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * If acquisition of the firm
     */
    function withdrawUnderlyingSharesIfAcquisition(address _underlyingToken, uint256 _amount) external onlyOwner {
        IERC20 sharesContract = IERC20(_underlyingToken);
        sharesContract.transfer(msg.sender, _amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
		return 18;
	}

    

    function _burn(address account, uint256 amount)
        internal
        onlyOwner
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
