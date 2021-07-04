const { clone } = require("../../../utils");

const getAnchoringDomainConfig = (domain) => {
    const config = require("../../../config");
    let domainConfig = config.getDomainConfig(domain, "anchoring");

    if (!domainConfig || typeof domainConfig !== 'object') {
        return;
    }

    domainConfig = clone(domainConfig);
    domainConfig.option = domainConfig.option || {};
    domainConfig.option.path = require("path").join(config.getConfig("externalStorage"), `domains/${domain}/anchors`);

    return domainConfig;
};

const getDomainFromKeySSI = function (ssiString) {
    const openDSU = require("opendsu");
    const keySSISpace = openDSU.loadApi("keyssi");
    const keySSI = keySSISpace.parse(ssiString);
    return keySSI.getDLDomain();
};

const ALIAS_SYNC_ERR_CODE = "sync-error";
const ANCHOR_ALREADY_EXISTS_ERR_CODE = "anchor-already-exists";

module.exports = { getAnchoringDomainConfig, getDomainFromKeySSI, ALIAS_SYNC_ERR_CODE, ANCHOR_ALREADY_EXISTS_ERR_CODE };
