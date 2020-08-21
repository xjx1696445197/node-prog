const Tx = require('ethereumjs-tx');

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "http://192.168.3.100:8545");

//import EthQuery from 'eth-query'

//web3.eth.getAccounts(console.log);


var privateKey1 = Buffer.from('46E38B0B3A9FD7238108AC489E939C4D5B11C6D645C132A5D601DEF55B292EE8','hex');//process.env.PRIVATE_KEY_1
var _from = "0xbc89cd00850c4632c4e45895c644a38959bd18d7";

var balance = web3.eth.getBalance(_from);
console.log('-------start----------');
console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '1000000000000'
//console.log(balance.toNumber()); // 1000000000000
console.log(balance);
console.log('-------end----------');


async function asy1(){
        let Balance = await web3.eth.getBalance(_from)
		console.log("------Balance-------- "+Balance.toString(10)); 
}
asy1();

/*
console.log(web3.eth.getTransactionCount(_from));//46E38B0B3A9FD7238108AC489E939C4D5B11C6D645C132A5D601DEF55B292EE8
 var txObject ={
    nonce: web3.utils.toHex(web3.eth.getTransactionCount(_from)),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),//"10"),
    gasLimit: web3.utils.toHex(29000),
    to: '0xf685669777c2e70d91372815e43e19547e5db705',
    value:web3.utils.toHex(web3.utils.toWei('0.001','ether')),
}

console.log(" gasLimit1 "+txObject.gasLimit); 
web3.eth.getTransactionCount(_from).then((res) => {
  var nonce2= res
  console.log(" nonce2 "+nonce2); 
 }).catch(  (error) => {
    res= error
  console.log("nonce2 error "+error); 
 } );

console.log(" nonce "+txObject.nonce);
console.log(" gasPrice "+txObject.gasPrice);
console.log(" value---- "+txObject.value);


var tx = new Tx(txObject);
tx.sign(privateKey1);
var serializedTx = tx.serialize();
//console.log(" hi "+web3.utils.toHex(tx.hash()));
 
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function(hash){
console.log(" hi "+hash);
});//.on('receipt', console.log);
*/

async function asy(){
 
 /*
 var nonce,gasPrice,gasLimit,value;
 
 await  web3.eth.getTransactionCount(_from) .then((res) => {
	console.log(" nonce: "+res); 
    nonce= web3.utils.toHex(res)
    console.log(" nonce toHex: "+nonce); 
 });
 gasPrice = web3.utils.toHex(web3.utils.toWei('10','gwei'));
 gasLimit = web3.utils.toHex(29000);
 value = web3.utils.toHex(web3.utils.toWei('0.001','ether'));
 var txObject ={
    nonce: nonce,
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')), 
    gasLimit: web3.utils.toHex(29000),
    to: '0xf685669777c2e70d91372815e43e19547e5db705',
    value:web3.utils.toHex(web3.utils.toWei('0.001','ether')),
}




eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value: web3.toWei(0.00000000000000001, "ether"),gas: 100000, price: 100})
*/

//--------------------------------------
        let nonce = await web3.eth.getTransactionCount(_from)
		console.log("------nonce-------- "+nonce); 
        let gasPrice = await web3.eth.getGasPrice()
		console.log("------gasPrice-------- "+gasPrice); 
       // let txValue = await web3.utils.toWei('0.001','ether') //???
		let txValue = web3.utils.numberToHex(web3.utils.toWei("0.1", "ether"));
		
		 console.log("txValue "+txValue); 
		
		gasPrice = web3.utils.toHex(web3.utils.toWei('101','gwei'));
		gasLimit = web3.utils.toHex(100000);
			
		
        var rawTx = {
            from:_from,
            nonce: nonce,
            gasPrice: gasPrice,
			gasLimit: gasLimit, 
            to: '0x5a520266710e203d23e6795b622b75438adf9e04',
            value: txValue,
			data:'',
			chainId: 8,
        }
        //需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
        let gas = await web3.eth.estimateGas(rawTx)
		console.log("------gas-------- "+gas); 
        rawTx.gas = gas
        var tx = new Tx(rawTx);
        tx.sign(privateKey1);
		var serializedTx = tx.serialize();
        let responseData; 
 
 
		 
       await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, data) {
			console.log(" err: "+err);  
			console.log(" data0: "+data); 

            if (err) {
                responseData = fail(err)
				console.log(" err: "+err);  
            }
        })
        .then(function(data) {
            //console.log(data)
			console.log(" data1: "+data);  
            if (data) {
                responseData = success({
                    "transactionHash":data.transactionHash
                })
            } else {
                responseData = fail("交易失败")
            }
        })
		 .catch(  (error) => {
			res= error
		  console.log("transaction error "+error); 
		 } ); 
		 
		 console.log("responseData "+responseData); 
		
//---------------------------------------- 
}
asy(); 
