// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Marketplace {
    struct AIModel {
        uint id;
        string name;
        string description;
        uint256 price;
        address seller;
        string fileUrl;
        bool sold;
    }
    
    IERC20 public token;
    uint public nextModelId;
    mapping(uint => AIModel) public models;
    
    event ModelListed(uint id, string name, uint256 price, address seller);
    event ModelSold(uint id, address buyer);
    
    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }
    
    /// @notice Функция для добавления нового листинга AI-модели
    function listModel(
        string memory name,
        string memory description,
        uint256 price,
        string memory fileUrl
    ) external {
        models[nextModelId] = AIModel(nextModelId, name, description, price, msg.sender, fileUrl, false);
        emit ModelListed(nextModelId, name, price, msg.sender);
        nextModelId++;
    }
    
    /// @notice Функция покупки модели (покупатель должен одобрить перевод токенов)
    function purchaseModel(uint modelId) external {
        AIModel storage model = models[modelId];
        require(!model.sold, "Model already sold");
        require(token.transferFrom(msg.sender, model.seller, model.price), "Token transfer failed");
        model.sold = true;
        emit ModelSold(modelId, msg.sender);
    }
}
