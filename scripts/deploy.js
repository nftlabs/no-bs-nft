async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

//   const OpenApeRegistry_Factory = await ethers.getContractFactory("OpenApeRegistry");
//   const openApe = await OpenApeRegistry_Factory.deploy();

//   console.log("OpenApeRegistry address:", openApe.address);

const BE_Factory = await ethers.getContractFactory("BidExecutor");
  const bidexecutor = await BE_Factory.deploy();

  console.log("OpenApeRegistry address:", bidexecutor.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// OpenApe address:  0x8faD543dEecf009a37f24De9926e288c3C384adD
// BidExecutor address: 0x539525b8081FeA30AE469Bd136dCd5CF5A5517b7