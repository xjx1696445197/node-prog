const ethTx = require('ethereumjs-tx');
import confirmedTransaction from '@/util/confirmedTransaction'
//合约
var MyTokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

class tx {
    static newEthTx(txParams) {
        let tx = new ethTx(txParams);
        return tx;
    }

    static strToHexCharCode(str) {
        if (str === "")
            return "";
        var hexCharCode = [];
        hexCharCode.push("0x");
        for (var i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    }

// 获取limit
    static async getGasLimit(web3, toAddress) {
        //let gasLimit  查询
        let gasLimit = await web3.eth.estimateGas({to: toAddress, data: ''})
        return gasLimit
    }

// 获取合约币余额
    static async balanceOf(web3, toAddress) {
        var balance = ""
        // var privateKey1 = Buffer.from('65F43679840DC2312A5208DC52A92789643B354ED5F7C2B371B89EB70CC545FC', 'hex');//process.env.PRIVATE_KEY_1
        var _contract_address = "0x9f4c420bd905e91920ddfa402944b9421b37aa67";
        var _from = toAddress;
        var myContract = new web3.eth.Contract(MyTokenABI, _contract_address);
        await myContract.methods.balanceOf(_from).call().then(function (result, error) {
            if (!error) {
                balance = result;
                console.log(result)
            } else {
                console.log(error);
            }
        });
        return balance
    }

    // 发起HALE交易
    static async sendTransaction(web3, txParams) {
        console.dir(txParams)
        let privateKey1 = Buffer.from(txParams.Private, 'hex');//process.env.PRIVATE_KEY_1

        var _from = txParams.from;

        let lastBlockNumber = await web3.eth.getBlockNumber()
        let nonce = await web3.eth.getTransactionCount(_from)
        console.log("------nonce-------- " + nonce);
        let inPutGas = txParams.inPutGas
        let gasPrice = txParams.gasPrice
        console.dir(gasPrice,"==gasPrice==")
        console.log("------inPutGas-------- " + inPutGas);
        let gasLimit = await web3.eth.estimateGas({to: txParams.to, from: txParams.from, data: ''})
        console.log("------gasLimit-------- ", gasLimit);
        // let txValue =  web3.utils.toWei(txParams.value, "ether") ;
        let txValue = txParams.value * 1000000;//10^6

        // txValue = web3.utils.numberToHex(web3.utils.toWei(txParams.value, "ether"));
        // gasPrice = web3.utils.toHex(web3.utils.toWei('1','gwei'));
        // let	gasLimit = web3.utils.toHex(10);

        let memo = this.strToHexCharCode(txParams.data)
        console.log(gasLimit)
        var rawTx = {
            from: _from,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(gasLimit + 10000),
            to: txParams.to,
            value: web3.utils.numberToHex(txValue),
            data: memo,
            gas: web3.utils.toHex(inPutGas),
            // chainId: 8,//测试
            chainId: 200812,

        }
        //需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
        // let gas = await web3.eth.estimateGas(rawTx)
        // rawTx.gas = gas

        //创建交易并签名
        console.dir(rawTx,"rawTx")
        var tx = new ethTx(rawTx);
        tx.sign(privateKey1);

        var serializedTx = tx.serialize();
        console.dir(('0x' + serializedTx.toString('hex')),"serializedTx")

        console.log("1w")
        console.log(('0x' + serializedTx.toString('hex')),"serializedTx")
        let txId = ''
        let a = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, data) {
            if (err) {
                console.warn("---txUtil----sendSignedTransaction-------err:" + err);
            } else {
                console.log("---txUtil----sendSignedTransaction-------data");
                console.log(data);
                txId = data
            }

        })
        console.log(a, "___________")
        if (txId != '') {
            console.log(1111111111111111)
            //let blockNumber = await web3.eth.getBlockNumber()
            let result = {
                "result": "succ",
                "msg": "交易成功",
                "txHash": txId,
                "lastBlockNumber": lastBlockNumber
            }
            return result

        } else {
            console.log(2222222222222222)
            let result = {
                "result": "err",
                "msg": "交易失败"
            };
            return result
        }
    }
}

export default tx
