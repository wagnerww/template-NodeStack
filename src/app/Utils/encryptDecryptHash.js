var aesjs = require("aes-js");

var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
/*var text = "Text may be any length you wish, no padding is required.";*/

class EncryptDecrypt {
  async encrypt(text) {
    try {
      var textBytes = aesjs.utils.utf8.toBytes(text);
      var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      var encryptedBytes = aesCtr.encrypt(textBytes);
      var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

      return encryptedHex;
    } catch (error) {}
  }

  async decrypt(encryptedHex) {
    try {
      var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
      var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      var decryptedBytes = aesCtr.decrypt(encryptedBytes);
      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

      return { isDecrypt: true, textDecrypt: decryptedText };
    } catch (error) {
      return { isDecrypt: false, textDecrypt: "" };
    }
  }
}

module.exports = new EncryptDecrypt();
