import { useState } from "react";
import server from "./server";
import wallet from "./safeWallet";

/**
 * Simulate coin transfer.
 */
function Transfer({ account, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // build the transaction payload composed of
    // the message itself (amount to transfer, recipient and sender) and
    // the signature of the transaction build from the user private key
    // and the message, inside the wallet.
    const sender = "0x" + wallet.getAddress(account);

    const msg = {
      amount: parseInt(sendAmount),
      recipient,
      sender,
    };

    const signature = await wallet.sign(account, msg);
    // console.log(sender);

    const tx = {
      msg,
      signature,
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, tx);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
