# Cartesi Cat Adoption DAPP

This is a cat adoption dapp built on Cartesi

## Requirements

- Make sure you have docker running
- Make sure nodejs is install on your machine

## How to run the dapp

#### Install Cartesi CLI

You can install Cartesi CLI with Node.js by running:

```bash
npm install -g @cartesi/cli
```

#### Clone the github repo

Go to your preferred directory and run:
```bash
git clone git@github.com:CyberGA/cat-adoption-dapp.git
cd cat-adoption-dapp
```

#### Build the dapp

To build the dapp, run:

```
cartesi build
```

You should see a Cartesi Machine snapshot output similar to this:

```
         .
        / \
      /    \
\---/---\  /----\
 \       X       \
  \----/  \---/---\
       \    / CARTESI
        \ /   MACHINE
         '

[INFO  rollup_http_server] starting http dispatcher service...
[INFO  rollup_http_server::http_service] starting http dispatcher http service!
[INFO  actix_server::builder] starting 1 workers
[INFO  actix_server::server] Actix runtime found; starting in Actix runtime
[INFO  rollup_http_server::dapp_process] starting dapp: javascript index.js
INFO:__main__:HTTP rollup_server url is http://127.0.0.1:5004
INFO:__main__:Sending finish

Manual yield rx-accepted (0x100000000 data)
Cycles: 2801607569
2801607569: 949fc4c3fc34333a0add4c1f367d2cc1d8c802c3ab3e5b96a78a116b78070dba
Storing machine: please wait
```

#### Running the dapp

```
cartesi run
```

It should print this output:

```
 ✔ Network 949fc4c3_default                       Created                                                                                                                                              0.0s
 ✔ Volume "949fc4c3_blockchain-data"              Created                                                                                                                                              0.0s
 ✔ Volume "949fc4c3_traefik-conf"                 Created
949fc4c3-prompt-1     | Anvil running at http://localhost:8545
949fc4c3-prompt-1     | GraphQL running at http://localhost:8080/graphql
949fc4c3-prompt-1     | Inspect running at http://localhost:8080/inspect/
949fc4c3-prompt-1     | Explorer running at http://localhost:8080/explorer/
949fc4c3-prompt-1     | Press Ctrl+C to stop the node
````