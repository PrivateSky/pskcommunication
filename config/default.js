const path = require("swarmutils").path;

const defaultConfig = {
    "storage": path.join(process.env.PSK_ROOT_INSTALATION_FOLDER, "tmp"),
    "sslFolder": path.join(process.env.PSK_ROOT_INSTALATION_FOLDER, "conf", "ssl"),
    "port": 8080,
    "host": "0.0.0.0",
    "zeromqForwardAddress": "tcp://127.0.0.1:5001",
    "preventRateLimit": false,
    // staticServer needs to load last
    "activeEndpoints": ["virtualMQ", "messaging", "notifications", "filesManager", "bricksLedger", "bricks", "anchoring", "bricksFabric", "dsu-wizard", "staticServer"],
    "endpointsConfig": {
        "messaging": {
            "module": "./components/mqManager",
            "workingDirPath": "./messaging",
            "storageDirPath": "./messaging/storage"
        },
        "notifications": {
            "module": "./components/keySsiNotifications",
            "workingDirPath": "./notifications"
        },
        "virtualMQ": {
            "module": "./components/channelManager",
            "channelsFolderName": "channels",
            "maxSize": 100,
            "tokenSize": 48,
            "tokenHeaderName": "x-tokenHeader",
            "signatureHeaderName": "x-signature",
            "enableSignatureCheck": true
        },
        "dsu-wizard": {
            "module": "dsu-wizard",
            "function": "initWizard"
        },
        "bricks": {
            "module": "./components/bricks"
        },
        "filesManager": {
            "module": "./components/fileManager"
        },
        "bricksFabric":{
          "module" : "./components/bricksFabric",
            "path": "./",
          "domainStrategies" : {
              "default" : {
                  "name": "BrickStorage",
                  "option" : {
                      "timeout" : 15000,
                     "transactionsPerBlock" : 5
                  }
              }
          }
        },
        "anchoring": {
            "module": "./components/anchoring",
            "domainStrategies": {
                "default": {
                    "type": "FS",
                    "option": {
                        "path": "/anchors"
                    },
                    "commands" : {
                        "addAnchor": "anchor"
                        // anchor se trimite in body ca si commandType, apoi este tradus in doAnchor si acesta e cautat in settings pentru a vedea ce executa
                        // domainStrategies : sunt legate intre ele ? adica anchoring va trimite strategia sa catre bricksLedger si acesta o va trimite catree bricksFabric ?
                        // momentan strategia pare sa poata fii determinata doar de anchoring care primeste un keySSI in params. Restul componentelor nu au metode prin care sa poata determina o strategie
                    }

                },
                "EPI": {
                    "type" : "etherum",
                    "endpoint" : "http://localhost:3000", // endpoitn catre API care proceseaza cererile catre etherum network
                    "option" : {
                       //maybe other options will be required
                    } // operation will be done dirrectlly into the Ethereum API -> jsonrpc-> network
                }
            }
        },
        "staticServer": {
            "module": "./components/staticServer"
        },
        "bricksLedger": {
            "module": "./components/bricksLedger",
            "doAnchor" : "anchorCommand.js",
            "doEPIAnchor" : "EPIAnchorCommand.js"
        }
    },
    "tokenBucket": {
        "cost": {
            "low": 10,
            "medium": 100,
            "high": 500
        },
        "error": {
            "limitExceeded": "error_limit_exceeded",
            "badArgument": "error_bad_argument"
        },
        "startTokens": 6000,
        "tokenValuePerTime": 10,
        "unitOfTime": 100
    }
};

module.exports = Object.freeze(defaultConfig);