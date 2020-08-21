const ethTx = require('ethereumjs-tx');
import confirmedTransaction from '@/util/confirmedTransaction'
class tx {
    static  newEthTx(txParams) {
        let tx = new ethTx(txParams);
        return tx;
    }
    static  strToHexCharCode(str) {
        if(str === "")
            return "";
        var hexCharCode = [];
        hexCharCode.push("0x");
        for(var i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    }
    static async getGasLimit(web3,toAddress) {
        //let gasLimit  查询 
        let gasLimit = await web3.eth.estimateGas({to: toAddress,data:''})
        return gasLimit
    }
    static async sendTransaction(web3,txParams) {
        console.log(txParams)
        let privateKey1 = Buffer.from(txParams.Private,'hex');//process.env.PRIVATE_KEY_1

        var _from = txParams.from;

        let lastBlockNumber = await web3.eth.getBlockNumber()
        let nonce = await web3.eth.getTransactionCount(_from)
        console.log("------nonce-------- "+nonce);
        let inPutGas = txParams.inPutGas
        let gasPrice = txParams.gasPrice

        console.log("------inPutGas-------- "+inPutGas);
        let gasLimit = await web3.eth.estimateGas({to: txParams.to,from: txParams.from,data:''})
        console.log("------gasLimit-------- ",gasLimit);
        // let txValue =  web3.utils.toWei(txParams.value, "ether") ;
        let txValue =  txParams.value*1000000 ;//10^12

        // txValue = web3.utils.numberToHex(web3.utils.toWei(txParams.value, "ether"));
        // gasPrice = web3.utils.toHex(web3.utils.toWei('1','gwei'));
        // let	gasLimit = web3.utils.toHex(10);

        let  memo=this.strToHexCharCode(txParams.data)
        var rawTx = {
            from:_from,
            nonce: nonce,
            gasPrice: gasPrice, 
            gasLimit: web3.utils.toHex(gasLimit)+10000,
            to: txParams.to,
            value: web3.utils.numberToHex(txValue),
            data:memo,
            gas:web3.utils.toHex(inPutGas),
            // chainId: 8,//测试
            chainId: 200812,

        }
        //需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
        // let gas = await web3.eth.estimateGas(rawTx)
        // rawTx.gas = gas

        //创建交易并签名
        var tx = new ethTx(rawTx);
        tx.sign(privateKey1);
        var serializedTx = tx.serialize();

        let txId = ''
        let a=await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, data) {
            if (err) {
                console.warn("---txUtil----sendSignedTransaction-------err:"+err);
            } else {
                console.log("---txUtil----sendSignedTransaction-------data");
                console.log(data);
                txId = data
            }

        })
        console.log(a,"___________")
        if( txId!='') {
            console.log(1111111111111111)
            //let blockNumber = await web3.eth.getBlockNumber()
            let result =  {
                "result":"succ",
                "msg":"交易成功",
                "txHash":txId,
                "lastBlockNumber":lastBlockNumber
            }
            return result

        } else {
            console.log(2222222222222222)
            let result =  {
                "result":"err",
                "msg":"交易失败"
            };
            return result
        }
    }
}
export default tx
