module.exports = {
  // BIP39 mnemonic phrase
  MNEMONIC:
    "injury health perfect finger acid deer lab purchase judge tunnel roast ocean",
  PRIVATE_KEY:
    "953c0fa8ca474a063e23a791fa2af9674282838c7ee3ffd4bdeb16b15ade0d34",
  // INFURA API key
  INFURA_KEY: "b3ff75c9f219477aa86dff3d9bc887ab",
  // FiatTokenProxy admin - can upgrade implementation contract
  PROXY_ADMIN_ADDRESS: "0x58D352f65939890b75ea8253B9C20C3534632B73",
  // Owner - can configure master minter, pauser, and blacklister
  OWNER_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
  // Master Minter - can configure minters and minter allowance
  MASTERMINTER_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
  // Pauser - can pause the contract
  PAUSER_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
  // Blacklister - can blacklist addresses
  BLACKLISTER_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
  // FiatTokenProxy contract - override the contract address used in migrations
  PROXY_CONTRACT_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
  // LostAndFound - tokens that were locked in the contract are sent to this
  LOST_AND_FOUND_ADDRESS: "0x4EB67Ce544756f9c7Ba6Db695505038D9dd3598d",
};

// proxyadmin, minter, pauser, blacklist, owner
