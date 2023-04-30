import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";
import * as secp256k1 from "secp256k1";

/**
 * Local wallet.
 * Simulate a MetaMask-like wallet which stores private keys safely,
 * and gives access to public key and address.
 * Keys are store in hexadecimal format.
 */

// List of account keys in hexa format without the '0x'
const accounts = new Map([
  [
    "wallet1",
    {
      address: "71642b74e9f77f515b6c7b42cafb3bcc7a25f272",
      privateKey:
        "e1187fd1c1fc97ea7e81196ee25e3be7c7b98b13860fabe75e904ddfd6737af6",
      publicKey:
        "040bb25a68da94e64cfa72a7ddaea1a7af769e5201d9acd8c4fb7a777dabf96e761b2dc885ec7abac4400ad429938ee162d66b8e33e96a54f57562fb63c7cff5cb",
    },
  ],
  [
    "wallet2",
    {
      address: "fecb117ab82c022dcdd48403da330fbcd202b883",
      privateKey:
        "7c5da300e048bbf19a1f2cb5ce21e19063a4a923b3e4e21797b647f4d33ff1a4",
      publicKey:
        "04cf5ca7e104f479f0dc9f97b920d62ed62d1a260ef2d4881bfaf5369c477bb4799417f67707f8fcd35b19644548a5403cd575e1acf5214b9dcae24a64b711d008",
    },
  ],
  [
    "wallet3",
    {
      address: "5f7302e897a015c1a64bb517b200b3b0a012edf4",
      privateKey:
        "decbf98c10a8d1410057402ab2ff8886f8203916d59f4164bcb3deb77b4a3786",
      publicKey:
        "04478674d88331014597a2c18aa4b700c3b109001e9addb06cbd85a30cbcaf0554faacc79f59a31114cb6dd75b64b79c80218a925b14e1f44a2e21c8c825a4973b",
    },
  ],
  [
    "wallet4",
    {
      address: "986ce2c578cd383db398ab95ce6224a1378e4b12",
      privateKey:
        "99addaff7971b9c586fe41d8e9c69c1d923dae23dd648ae81a32f987932085b9",
      publicKey:
        "0495fc3b445ccb827c5cae1f63fb48eb0f37ad271c4364beffe6660fe1bca3577c86f710c4d378ed626958d8fb0d0e787ce80dcef252be0be955de73bcdccb4396",
    },
  ],
  [
    "wallet5",
    {
      address: "820858ca4633963047facfe2234de745c59000e3",
      privateKey:
        "665651265665d9a46004b11c940afcd5371ec06295cfcf97b41ffdf3265da5d8",
      publicKey:
        "0478f67826efff9560c270788c8f616caff49a91644c1cd2022a518a2320aced004850c43372962170f83c77d927bd414132e464d52afa1af26076cb9d9420199a",
    },
  ],
  [
    "wallet6",
    {
      address: "6c21d37aca514b9b0f621f5f8d7332cd1e74d663",
      privateKey:
        "90d16cd56e713216e5eafcb2db714012a0fff9067cea2983c354388755de977d",
      publicKey:
        "04be389ac796a42c1a7b167a8ec4689644ce5245e903fc729941636fed088f1c16cea4536d4f4f3654ae6ce39cc76176ee80ca555b9fac003ccd71862298e54373",
    },
  ],
]);

// wallets derived from the list of accounts
const wallets = Array.from(accounts.keys());

/**
 * Get the user address.
 * @param _wallet the wallet
 * @returns the address as hex.
 */
const getAddress = (_wallet) => {
  if (!_wallet) return null;
  return accounts.get(_wallet).address;
};

/**
 * Get the user public key.
 * @param _wallet the wallet
 * @returns the public key as hex.
 */
const getPublicKey = (_wallet) => {
  if (!_wallet) return null;
  return accounts.get(_wallet).publicKey;
};

/**
 * Get the user private key.
 * @param _wallet the wallet
 * @returns the private key as hex.
 */
const getPrivateKey = (_wallet) => {
  if (!_wallet) return null;
  return accounts.get(_wallet).privateKey;
};

/**
 * Hash a message using KECCAK-256
 * @param msg the message to hash.
 * @returns the hash of the message.
 */
const hash = (msg) => keccak256(Uint8Array.from(msg));

/**
 * Sign a message.
 * @param _wallet of the user account.
 * @param msg message to sign
 * @returns the signature in hexa format with the recovery bit as the first byte.
 */
const sign = async (_wallet, msg) => {
  const privateKey = hexToBytes(getPrivateKey(_wallet));
  const hashmsg = hash(msg);

  const signature = await secp256k1.ecdsaSign(hashmsg, privateKey);
  const signHex = toHex(
    Uint8Array.from([signature.recid, ...signature.signature])
  );
  return signHex;
};

const wallet = {
  wallets,
  sign,
  getAddress,
};

export default wallet;
