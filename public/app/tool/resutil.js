const pub_key ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw0LKbQ05FVXf01W0PXVyvUF8Ou6mIRaPazRdw0ZlRgbV0Ld/B63d9xNX4I2cZfZw70BIgO5sgIfoOFtvidWwD5ouDFwug6DGqaGVudbdmfStO1dSBOUzqWibEQuAciflNCEWhKk2aPwVacuk/wDUYAQlf/Ubr30wp7CuPS4knjCi72LZ8B4X5Lkbxy2Li8rONEPRzcPXk8/qoR7U6UFLebyHM+ZhpPOqu/xI0zG5QK2BvPgM4igssLdHMLZfBS4VoCVnhVje+i2vzdpyPe0h7VDsmn/igeoMW9ERi5VKr95X8UfAMSEDNUwYott+N/P1TzKCW95XZvY1lk1CRQbgZQIDAQAB";

window.$rsaEncrypt = function(content){
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pub_key);
    return encrypt.encrypt(content);
}
 