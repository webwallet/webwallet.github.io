function generateAddress(prefix) {
    var crypto = require('crypto-browserify'),
        createHash = crypto.createHash,
        createECDH = crypto.createECDH,
        ripemd160 = require('ripemd160'),
        ecdh = createECDH('secp256k1'),
        base58check = require('bs58check'),
        publicPrefix = prefix || '87',
        privatePrefix = ((Number('0x' + publicPrefix) + 128) % 256).toString(16);
        privatePrefix = (privatePrefix.length === 1) ? '0' + privatePrefix : privatePrefix;

    ecdh.generateKeys();
    var publicKey = ecdh.getPublicKey(),
        privateKey = ecdh.getPrivateKey('hex');

    var sha256hash = createHash('sha256').update(publicKey).digest(),
        ripemd160hash = ripemd160(sha256hash),
        ripemd160hashX = publicPrefix + ripemd160hash.toString('hex'),
        base58Public = base58check.encode(new Buffer(ripemd160hashX, 'hex')),
        base58Private = base58check.encode(new Buffer(privatePrefix + privateKey, 'hex'));

    return {
        address: base58Public,
        keys: {
            public: {
                hex: publicKey.toString('hex').toUpperCase()
            },
            private: {
                hex: privateKey.toString('hex').toUpperCase(),
                b58: base58Private
            }
        }
    };
}

window.onload = function () {
    var walletAddress = generateAddress();
    document.querySelector('.api-console-form .wallet-address').value = walletAddress.address;
}
