const TronWeb = require('tronweb')

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://127.0.0.1:8090");
const solidityNode = new HttpProvider("https://127.0.0.1:8090");
const eventServer = new HttpProvider("https://127.0.0.1:8090");


async function triggerSmartContract() {
    const privateKey = "your private key";
    const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
    const trc20ContractAddress = "TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK";//contract address 
    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        let result = await contract.transfer(
            // Receiver Address
            "TVDGp...",
            // Transfer amount 
            1000000
        ).send({
            feeLimit: 1000000
        }).then(output => {console.log('- Output:', output, '\n');});
        console.log('result: ', result);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}
