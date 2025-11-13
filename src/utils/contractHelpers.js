import { ethers } from 'ethers';
import MarketFactoryABI from '../contracts/MarketFactory.json';
import MarketABI from '../contracts/Market.json';
import TokenABI from '../contracts/APMToken.json';

const PROVIDER = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  // fallback provider to BSC testnet RPC
  const rpc = import.meta.env.VITE_RPC_URL;
  return new ethers.JsonRpcProvider(rpc);
}

export const getProvider = PROVIDER;

export const getSigner = async () => {
  const p = PROVIDER();
  if (p instanceof ethers.BrowserProvider) {
    return await p.getSigner();
  }
  return null;
}

export const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
export const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;

export const getFactoryContract = async (signerOrProvider) => {
  const s = signerOrProvider || PROVIDER();
  return new ethers.Contract(factoryAddress, MarketFactoryABI.abi || MarketFactoryABI, s);
}

export const getTokenContract = async (signerOrProvider) => {
  const s = signerOrProvider || PROVIDER();
  return new ethers.Contract(tokenAddress, TokenABI.abi || TokenABI, s);
}

// helper examples
export const createMarket = async (name) => {
  const signer = await getSigner();
  const factory = await getFactoryContract(signer || PROVIDER());
  const tx = await factory.createMarket(name);
  await tx.wait();
  return tx;
}

export const fetchDeployedMarkets = async () => {
  const provider = PROVIDER();
  const factory = await getFactoryContract(provider);
  // assume factory has allMarkets(uint index) or public array: allMarkets
  try {
    const count = await factory.allMarketsLength?.() // optional if implemented
    if (count) {
      const arr = [];
      for (let i=0;i<Number(count);i++) {
        const addr = await factory.allMarkets(i);
        arr.push(addr);
      }
      return arr;
    } else {
      // try reading events not supported here; return empty
      return [];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}
