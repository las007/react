import MD5 from "blueimp-md5";
import JSEncrypt from "jsencrypt";

export default {
    //密码用MD5加密
    passwordMD5: (password) => {
        console.log('log md5..', password);
        return MD5(password)
    },

    //rsa对aes秘钥 加密
    rsaEncrypt: (publicKey, str) => {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        console.log('log rasEncrypt..', encrypt.encrypt(str));
        return encrypt.encrypt(str)
    },

    //解密
    decrypt: (msg) => {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIICXQIBAAKBgQDEAkKgvpGfbJEHf4ScLdk1wK8WHkmtsaQac3+5pvK0yHIFdLb9\n' +
        'PooGrbiO5Z/cs012d5NVLWzzTRFe6Z1/+tGympZ8p8OVDmytaJNr/7jhFy30Jduc\n' +
        'LjiRSDTGasKTk02+ePAgciz5fDnsB0ugHeUqNL1UvlqehSjQoQSMix34OwIDAQAB\n' +
        'AoGAdr6DzMwGfpWP+wHmvZMNDwJvT7ADpMWEjD3CeB9K0/jHEsUVgrAbgFZIA9Ha\n' +
        'miLJ3+YrDKQbZ/4dcumGcBzsYf7MMBl8/DSPOekEIP5XOX/8LDTPw0F7y3EkVmp/\n' +
        'xT+dbc8WPvczv9E3NbhDKnMPC5Z+l2ZDD2Za+mJLoVQDaUECQQDkYZ+2UhdZu+Ei\n' +
        'Oj4mErTt7YD196+PyG0XlQQRdPpGoHHx58RjCMiYyitGxsuK8dl5AGTjMY3F+CKx\n' +
        'H41DbCXhAkEA27ZtZaCGGPIjP6YVNbeH/YzX2E8dA9s6aOO/mL4YtqgD8L7Gr01P\n' +
        'FyrsGsBNDRbgr2VJAwZQRMSy1EqD1NIpmwJAaJzfT+CimZQaOFd9iGshPauBWyot\n' +
        '3Srt7dNwnZ571kZAa5LCvqqTWImi8TS2n9rQx0CK9hcI3hofqgrN5ohvgQJBAKoU\n' +
        'MeM1vBibeEXRHyISDKdt27iKpX9SuYhwpORsY10h+srmI4+YXN0mUNb0fbDgQNYF\n' +
        'pds9i+1wBq7nb93TQnkCQQCwgnuekCw5ZYRPRcLoJgHjbQJRxbhdXXWvPoZLZMVm\n' +
        '1RO/ybXDkozOe2B1Vv3xHhAOqIudaiJL+BBsrLvOaZHV\n' +
        '-----END RSA PRIVATE KEY-----\n');
        console.log('log decrypt msg..', msg);
        return decrypt.decrypt(msg)
    }
}
