import BigNumber from 'bignumber.js'
import { getSdcAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CAKE balance is at least the amount passed in
 */
const useHasSdcBalance = (minimumBalance: BigNumber) => {
  const sdcBalance = useTokenBalance(getSdcAddress())
  return sdcBalance.gte(minimumBalance)
}

export default useHasSdcBalance
