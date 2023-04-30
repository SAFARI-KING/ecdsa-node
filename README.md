# ecdsa-node overview

This is the week 1 project from Alchemy university - Ethereum blockchain developer bootcamp. 

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## Description

I decided to create a fake wallet on the client side which takes care of private/public keys and address of different account.

So, on the client side, you just select a wallet and it will sign the transaction with the wallet private key, inside the fake wallet.
Then, the transaction is sent to the server.
The server only knows wallet addresses. It will retrieve the sender address from the signature.
The recipient field is also an address and not a public key. Then the server updates the balance map and that's it :)
