const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const secp256k1 = require("secp256k1");

/**
 * Hash a message using KECCAK-256
 * @param msg the message to hash.
 * @returns the hash of the message.
 */
const hash = (msg) => keccak256(Uint8Array.from(msg));

/**
 * Convert a public key to an address
 * @param pk the public key.
 * @returns the address in hex format.
 */
const pubToAdd = (pk) => {
  const hashmsg = keccak256(hexToBytes(pk).slice(1));
  return toHex(hashmsg.slice(-20));
};

/**
 * Get the public key from the signature.
 * @param msg the message.
 * @param sig the signature in hexa format with the recovery bit as the first byte.
 * @return the public key in hex format.
 */
const sigToPubKey = (msg, sig) => {
  const msgHash = hash(msg);
  const recid = hexToBytes(sig)[0];
  const signature = hexToBytes(sig).slice(1);
  const publicKey = secp256k1.ecdsaRecover(signature, recid, msgHash, false);
  return toHex(publicKey);
};

module.exports = {
  hash,
  pubToAdd,
  sigToPubKey,
};
