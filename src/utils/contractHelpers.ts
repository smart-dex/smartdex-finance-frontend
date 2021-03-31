import {
  getSmartDEXChainProfileAddress,
  getSmartDEXChainRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
} from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import profileABI from 'config/abi/smartDEXChainProfile.json'
import smartDEXChainRabbitsAbi from 'config/abi/smartDEXChainRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'

export const getProfileContract = () => {
  return getContract(profileABI, getSmartDEXChainProfileAddress())
}

export const getSmartDEXChainRabbitContract = () => {
  return getContract(smartDEXChainRabbitsAbi, getSmartDEXChainRabbitsAddress())
}

export const getBunnyFactoryContract = () => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress())
}

export const getBunnySpecialContract = () => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress())
}

export default null
