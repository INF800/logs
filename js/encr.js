function encryptData(data, key){
    return CryptoJS.AES.encrypt(data, key);
}

function decryptData(encrypted, key, toString=true) {
    if (toString === true){
        return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);    
    }
    return CryptoJS.AES.decrypt(encrypted, key);
}