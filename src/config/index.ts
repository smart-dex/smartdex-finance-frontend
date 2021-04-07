import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const SDC_PER_BLOCK = new BigNumber(40)
export const BLOCKS_PER_YEAR = new BigNumber(10512000) 
export const BSC_BLOCK_TIME = 3
export const BLOCKS_PER_WEEK = new BigNumber(60 * 60 * 24 * 7 / BSC_BLOCK_TIME)
export const SDC_POOL_PID = 1
export const BASE_URL = 'https://smartdex.sotatek.works'
export const BASE_EXCHANGE_URL = 'https://smartdex-exchange.sotatek.works'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
