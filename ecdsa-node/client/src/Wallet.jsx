import server from "./server";
import accounts from "./safeWallet";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  account,
  setAccount,
}) {
  /**
   * On account selection, update the account balance.
   * @param evt the DOM event containing the selected wallet.
   */
  async function onSelect(evt) {
    const _account = evt.target.value;
    setAccount(_account);

    const address = `0x${accounts.getAddress(_account)}`;
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet
        <select onChange={onSelect} value={account}>
          <option value="">--- please choose an account ---</option>
          {accounts.wallets.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>

      {/* <div>Account: {account}</div> */}

      <div>Address: {account ? address : ""}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
