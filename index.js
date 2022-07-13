const Web3 = require("web3");
const FiatTokenV1ABI = require("./FiatTokenV1.json");
const FIAT_TOKEN_CONTRACT_ADDRESS =
  "0x48D43ECDA5c85A71cf223dc051aF6c46DdbF0167";
const PRIVATE_KEY = require("./config").PRIVATE_KEY;
const PUBLIC_KEY = require("./config").OWNER_ADDRESS;
const INFURA_API_KEY = require("./config").INFURA_KEY;

const web3Provider = new Web3(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`);

const FIAT_TOKEN_CONTRACT = new web3Provider.eth.Contract(
  FiatTokenV1ABI.abi,
  FIAT_TOKEN_CONTRACT_ADDRESS
);

const getNonce = async () => {
  try {
    const nonce = await web3Provider.eth.getTransactionCount(
      PUBLIC_KEY,
      "pending"
    );
    return nonce;
  } catch (e) {
    console.error("ERROR getNonceByEthAddress -> ", e);
  }
};

const configureMinter = async () => {
  let nonce = await getNonce();
  console.log("NONCE ==> ", nonce);
  const rawTransactionEth = {
    from: PUBLIC_KEY,
    to: FIAT_TOKEN_CONTRACT_ADDRESS,
    data: FIAT_TOKEN_CONTRACT.methods
      .configureMinter(PUBLIC_KEY, "100000000000000")
      .encodeABI(),
    gasPrice: 100000000000,
    gasLimit: 5000000,
    nonce: web3Provider.utils.toHex(nonce),
    chainId: 3, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const signedEth = await web3Provider.eth.accounts.signTransaction(
    rawTransactionEth,
    PRIVATE_KEY
  );

  const _txnR = await web3Provider.eth.sendSignedTransaction(
    signedEth.rawTransaction
  );
  console.log(`Transaction hash: ${_txnR.transactionHash}`);
};

const mintfiatToken = async () => {
  let nonce = await getNonce();
  const rawTransactionEth = {
    from: PUBLIC_KEY,
    to: FIAT_TOKEN_CONTRACT_ADDRESS,
    data: FIAT_TOKEN_CONTRACT.methods
      .mint(PUBLIC_KEY, "100000000000000")
      .encodeABI(),
    gasPrice: 100000000000,
    gasLimit: 5000000,
    nonce: web3Provider.utils.toHex(nonce),
    chainId: 3, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const signedEth = await web3Provider.eth.accounts.signTransaction(
    rawTransactionEth,
    PRIVATE_KEY
  );

  const _txnR = await web3Provider.eth.sendSignedTransaction(
    signedEth.rawTransaction
  );
  console.log(`Transaction hash: ${_txnR.transactionHash}`);
};

const burnfiatToken = async () => {
  let nonce = await getNonce();
  const rawTransactionEth = {
    from: PUBLIC_KEY,
    to: FIAT_TOKEN_CONTRACT_ADDRESS,
    data: FIAT_TOKEN_CONTRACT.methods.burn("100000000000000").encodeABI(),
    gasPrice: 100000000000,
    gasLimit: 5000000,
    nonce: web3Provider.utils.toHex(nonce),
    chainId: 3, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const signedEth = await web3Provider.eth.accounts.signTransaction(
    rawTransactionEth,
    PRIVATE_KEY
  );

  const _txnR = await web3Provider.eth.sendSignedTransaction(
    signedEth.rawTransaction
  );
  console.log(`Transaction hash: ${_txnR.transactionHash}`);
};

const getMasterMinter = async () => {
  const masterMinter = await FIAT_TOKEN_CONTRACT.methods.blacklister().call();
  console.log("MASTER MINTER ===> ", masterMinter);
};

const main = async () => {
  // await getMasterMinter();
  // await configureMinter();
  await mintfiatToken();
  // await burnfiatToken();
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
