import { usePriceSdcBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalSdc = getBalanceNumber(totalRewards)
  const sdcPriceBusd = usePriceSdcBusd()

  return totalSdc * sdcPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
