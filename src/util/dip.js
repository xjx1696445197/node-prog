// 钱包创建导入
import CryptoJS from 'crypto-js'

const KeyringController = require('eth-keyring-controller')
const SimpleKeyring = require('eth-simple-keyring')
const bech32 = require('bech32');
const bitcoin = require('bitcoinjs-lib'),
    bip39 = require('bip39');
const keyringController = new KeyringController({
    keyringTypes: [SimpleKeyring], // optional array of types to support.
})
var newkeyringcontroller = new KeyringController()
// string转bytes
function Str2Bytes(str) {
    var pos = 0;
    var len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    var hexA = new Array();
    for (var i = 0; i < len; i++) {
        var s = str.substr(pos, 2);
        var v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
}
// bytes转string
function Bytes2Str(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i].toString(16);
        if (tmp.length == 1) {
            tmp = "0" + tmp;
        }
        str += tmp;
    }
    return str;
}

//hale转eth地址
const Halletoeth = async function Halletoeth(address) {
    const words = bech32.decode(address)
    var buffer = bech32.fromWords(words.words)
    return "0x" + Bytes2Str(buffer)
}
//eth转hale地址
const Ethtohelle = async function Ethtohelle(address) {
    const words = bech32.toWords(Str2Bytes(address).splice(1, 21))
    // console.log(words, "wordswordswordswordswordswordswords")
    return bech32.encode("halle", words)
}
//获取缓存信息
const Existingaccounts = async function Existingaccounts(password) {
    const keyr = await newkeyringcontroller.submitPassword(password)
    const oldAccounts = await newkeyringcontroller.getAccounts()
    return oldAccounts
    // const keyState = await keyringController.addNewAccount(keyr)
    // const newAccounts = await keyringController.addAccounts()
    // console.log(newAccounts)
}
const Derivingmnemonics = async function Derivingmnemonicss(password) {
   console.log(password)
    const keyr = await newkeyringcontroller.submitPassword(password)
    const primaryKeyring = newkeyringcontroller.getKeyringsByType('HD Key Tree')[0]
    const serialized = await primaryKeyring.serialize()
    const seedWords = serialized.mnemonic
    return seedWords
    // const keyState = await keyringController.addNewAccount(keyr)
    // const newAccounts = await keyringController.addAccounts()
    // console.log(newAccounts)
}

//创建钱包  取出eth和halle的地址
const Submitpasswords = async function Submitpassword(password, name) {
    const key = await newkeyringcontroller.createNewVaultAndKeychain(password)
    const accounts = await newkeyringcontroller.getAccounts()
    var haleaddress = ""
    // var haleethaddress = ""
    const primaryKeyring = newkeyringcontroller.getKeyringsByType('HD Key Tree')[0]
    console.log(primaryKeyring)
    if (!primaryKeyring) {
        throw new Error('MetamaskController - No HD Key Tree found')
    }
    const serialized = await primaryKeyring.serialize()
    const seedWords = serialized.mnemonic
    await newkeyringcontroller.exportAccount(accounts[0]).then((res) => {
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(res,"exportAccount")
        // console.log(bip39.entropyToMnemonic(res))
        // console.log(bip39.mnemonicToEntropy(bip39.entropyToMnemonic(res)))

    })
    await newkeyringcontroller.exportAccountPublic(accounts[0]).then((res) => {
        // console.log(res,"exportAccountPublics")
    })
    await newkeyringcontroller.getPublicKeyFor(accounts[0]).then((res) => {
        const words = bech32.toWords(Str2Bytes(accounts[0]).splice(1, 21))
        haleaddress=bech32.encode("halle", words)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(res,"getPublicKeyFor")
        // console.log(words,"words")
        // const message = CryptoJS.enc.Hex.parse(res.toString('hex'))
        // console.log(CryptoJS.SHA256(message).toString("hex"),"hashhash")
        // const sha256 = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(message));
        // console.log(sha256,"sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256")
        // const address = CryptoJS.RIPEMD160(CryptoJS.SHA256(message)).toString()
        // console.log(message,"message")
        // console.log(address,"address")
        // console.log(cosmosAddress,"cosmosAddress")
        // console.log(bech32Prefix, "bech32Prefixbech32Prefixbech32Prefixbech32Prefixbech32Prefix")
        // haleethaddress = bech32ify(address + accounts[0], "hale")
        // console.log(haleaddress, "cosmosAddresscosmosAddresscosmosAddresscosmosAddresscosmosAddresscosmosAddress")
        // haleaddress = bech32ify(address, "hale")
        // haleaddress = "hale" + cosmosAddress

        // console.log(haleaddress)

    }).catch((err) => {
        console.log(err)
    })
    // var haleethaddress = haleaddress + " " + accounts

    return [seedWords, haleaddress, {"name":name,"accounts":accounts[0],"active":true}]

}
//添加地址
const addaccountsss = async function addaccounts(name) {
    const primaryKeyring = newkeyringcontroller.getKeyringsByType('HD Key Tree')[0]
    // console.log(primaryKeyring)
    const Controller = newkeyringcontroller
    const oldAccounts = await Controller.getAccounts()
    const keyState = await Controller.addNewAccount(primaryKeyring)
    const newAccounts = await Controller.getAccounts()
    //筛选出新添加的地址
    let diffRes = []
    let fDatas = []
    let cDatas = []
    for(let i in oldAccounts){
        let flg = false
        for(let j in newAccounts){
            if(newAccounts[j]===oldAccounts[i]){
                flg = true
                break
            }
        }
        if(!flg){
            fDatas.push(oldAccounts[i])
        }
    }
    for(let i in newAccounts){
        let flg = false
        for(let j in oldAccounts){
            if(oldAccounts[j]===newAccounts[i]){
                flg = true
                break
            }
        }
        if(!flg){
            cDatas.push(newAccounts[i])
        }
    }
    diffRes.push(...cDatas.concat(fDatas))
    return  {"name":name,"accounts":diffRes[0],"active":false}
}
//取私钥
const getPrivat = async function getPrivat(address) {
    const accounts = await newkeyringcontroller.getAccounts()
    var Private=""
    await newkeyringcontroller.getPrivateKeyFor(accounts[0]).then((res) => {
        Private=res.toString('hex')
    })
    return Private
    }
//助记词导入钱包   取出eth和halle的地址
const ImportWallet = async function ImportWallet(password, seed,name) {
    const key = await newkeyringcontroller.createNewVaultAndRestore(password, seed)
    // const accounts = await newkeyringcontroller.getAccounts()
    var haleaddress = ""
    // var haleethaddress = ""
    const primaryKeyring = newkeyringcontroller.getKeyringsByType('HD Key Tree')[0]
    // await newkeyringcontroller.addNewAccount(primaryKeyring)
    const accounts = await newkeyringcontroller.getAccounts()

    if (!primaryKeyring) {
        throw new Error('MetamaskController - No HD Key Tree found')
    }
    const serialized = await primaryKeyring.serialize()
    const seedWords = serialized.mnemonic
    await newkeyringcontroller.exportAccount(accounts[0]).then((res) => {
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(res,"exportAccount")
    })
    await newkeyringcontroller.exportAccountPublic(accounts[0]).then((res) => {
        // console.log(res,"exportAccountPublics")
    })
    await newkeyringcontroller.getPublicKeyFor(accounts[0]).then((res) => {
        const words = bech32.toWords(Str2Bytes(accounts[0]).splice(1, 21))
        haleaddress=bech32.encode("halle", words)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(111)
        // console.log(res,"getPublicKeyFor")
        // console.log(words,"words")
        // const message = CryptoJS.enc.Hex.parse(res.toString('hex'))
        // // console.log(CryptoJS.SHA256(message).toString("hex"),"hashhash")
        // const sha256 = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(message));
        // // console.log(sha256,"sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256sha256")
        // const address = CryptoJS.RIPEMD160(CryptoJS.SHA256(message)).toString()
        // console.log(message,"message")
        // console.log(address,"address")
        // console.log(cosmosAddress,"cosmosAddress")
        // console.log(typeof address, address)
        // console.log(typeof accounts[0], accounts[0])

        // haleethaddress = bech32ify(address + accounts[0], "hale")
        // console.log(haleaddress, "cosmosAddresscosmosAddresscosmosAddresscosmosAddresscosmosAddresscosmosAddress")
        // haleaddress = bech32ify(address, "hale")
        // haleaddress = "hale" + address
        // bech32decode(haleaddress)
        // console.log(haleaddress)
        // console.log(Str2Bytes(accounts[0]).splice(1, 21), "Str2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2Bytes")
        // console.log(words, "wordswordswordswordswordswords")
    }).catch((err) => {
        console.log(err)
    })
    return [seedWords, haleaddress, {"name":name,"accounts":accounts[0],"active":true}]
}
const SeedPhrase = async function verifySeedPhrase(add) {
    console.log(add,"addaddaddaddaddaddaddaddaddaddaddadd")
    // keyringController.createNewVaultAndKeychain("123456789")

    // keyringController.createNewVaultAndKeychain("123").then(
    //     (res) => {
    //         console.log(1)
    //         console.log(1)
    //         console.log(1)
    //         console.log(1)
    //         console.log(1)
    //         console.log(res.keyrings[0].accounts[0])
    newkeyringcontroller.getKeyringForAccount(add).then(
                (res) => {
                    console.log(21)
                    console.log(21)
                    console.log(21)
                    console.log(21)
                    console.log(21)
                    console.log(res)
                    // keyringController.addNewAccount(res).then(
                    //     () => {
                    //         keyringController.getAccounts().then(
                    //             (res) => {
                    //                 console.log("getAccounts")
                    //                 console.log("getAccounts")
                    //                 console.log("getAccounts")
                    //                 console.log("getAccounts")
                    //                 console.log("getAccounts")
                    //                 console.log(res)
                    //             })
                    //     }
                    // )

                }
            )
    //     }
    // )
    // const keyring = await keyringController.addNewKeyring("HD Key Tree")
    // console.log(keyring, "keyring")
    // const newaccounts = await keyring.addAccounts(6)
    // const Newaccount = await keyringController.addNewAccount(keyring)
    // const  pk= await keyringController.exportAccount(Newaccount)

    // console.log(newaccounts, "newaccounts")
    // console.log(Newaccount, "Newaccount")
    // console.log(pk,"pk")

    //
    // const primaryKeyring = keyringController.getKeyringsByType('HD Key Tree')[0]
    // if (!primaryKeyring) {
    //     throw new Error('MetamaskController - No HD Key Tree found')
    // }
    //
    // const serialized = await primaryKeyring.serialize()
    // const seedWords = serialized.mnemonic
    // const accounts = await primaryKeyring.getAccounts()
    // if (accounts.length < 1) {
    //     throw new Error('MetamaskController - No accounts found')
    // }
    // return seedWords
    // try {
    //     await seedPhraseVerifier.verifyAccounts(accounts, seedWords)
    //     console.log(seedWords)
    //     return seedWords
    // } catch (err) {
    //     console.error(err.message)
    //     throw err
    // }
}
//导入私钥取出eth地址和hale地址
const Importprivatekey = async function Importprivatekey() {
    // console.log(bech32)
    const keyring = await keyringController.addNewKeyring('Simple Key Pair', ["0xa6733a955a2fddb275b76e786eae8c54283de2427001a07fe01bfe58a8976840"])
    const accounts = await keyring.getAccounts()
    // console.log(keyring, "keyringkeyringkeyringkeyringkeyringkeyring")
    console.log(accounts, "eth地址")
    const Public = keyring.getPublicKeyFor(accounts[0])
    const words = bech32.toWords(Str2Bytes(accounts[0]).splice(1, 21))
    // console.log(Str2Bytes(accounts[0]).splice(1, 21), "Str2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2BytesStr2Bytes")
    // console.log(words, "wordswordswordswordswordswords")
    console.log(bech32.encode("halle", words), "halle地址")
}
export {
    SeedPhrase,
    Submitpasswords,
    addaccountsss,
    Existingaccounts,
    ImportWallet,
    Importprivatekey,
    Halletoeth,
    Ethtohelle,
    Derivingmnemonics,
    getPrivat
}

// const dip = async function demo() {
//     keyringController.createNewVaultAndKeychain("1234567890")
//     const keyring = await keyringController.addNewKeyring("Simple Key Pair")
//     const newaccount = await keyringController.addNewAccount(keyring)
//     const accounts = await keyringController.getAccounts()
// }
