import { ethers } from "ethers";
import factoryABI from "../contracts/MarketFactory.json";
import marketABI from "../contracts/Market.json";
import tokenABI from "../contracts/APMToken.json";
import factoryAddr from "../contracts/factoryAddress.json";

export const getProvider = () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return await provider.getSigner();
};

export const getFactoryContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(factoryAddr.address, factoryABI, signer);
};

export const getTokenContract = async (tokenAddr) => {
  const signer = await getSigner();
  return new ethers.Contract(tokenAddr, tokenABI, signer);
};

export const getMarketContract = async (marketAddr) => {
  const signer = await getSigner();
  return new ethers.Contract(marketAddr, marketABI, signer);
};
