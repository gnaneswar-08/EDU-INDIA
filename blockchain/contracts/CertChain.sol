// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertChain {
    struct Certificate {
        string certId;
        string hash;
        string issuerName;
        string holderName;
        uint256 timestamp;
        bool isValid;
    }

    mapping(string => Certificate) private certificates;
    mapping(address => bool) public authorizedIssuers;
    address public owner;

    event CertificateIssued(string certId, string hash, string issuerName, string holderName, uint256 timestamp);
    event CertificateRevoked(string certId, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized issuer");
        _;
    }

    function addIssuer(address issuer) public onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function issueCertificate(
        string memory certId,
        string memory hash,
        string memory issuerName,
        string memory holderName
    ) public onlyIssuer {
        require(bytes(certificates[certId].certId).length == 0, "Certificate already exists");
        certificates[certId] = Certificate(certId, hash, issuerName, holderName, block.timestamp, true);
        emit CertificateIssued(certId, hash, issuerName, holderName, block.timestamp);
    }

    function verifyCertificate(string memory certId, string memory hash) public view returns (bool, string memory, string memory, uint256) {
        Certificate memory cert = certificates[certId];
        if (bytes(cert.certId).length == 0) return (false, "", "", 0);
        bool hashMatch = keccak256(bytes(cert.hash)) == keccak256(bytes(hash));
        return (hashMatch && cert.isValid, cert.issuerName, cert.holderName, cert.timestamp);
    }

    function getCertificate(string memory certId) public view returns (Certificate memory) {
        return certificates[certId];
    }

    function revokeCertificate(string memory certId) public onlyIssuer {
        require(bytes(certificates[certId].certId).length != 0, "Certificate not found");
        certificates[certId].isValid = false;
        emit CertificateRevoked(certId, block.timestamp);
    }
}