import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { BLOCKS_PER_YEAR, SDC_PER_BLOCK, SDC_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceSdcBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import { FarmHeader, HeadingFarm } from './components/FarmHeader'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const sdcPrice = usePriceSdcBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const ethPriceUsd = usePriceEthBusd()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const sdcPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === SDC_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const sdcRewardPerBlock = SDC_PER_BLOCK.times(farm.poolWeight)
        const sdcRewardPerYear = sdcRewardPerBlock.times(BLOCKS_PER_YEAR)

        // sdcPriceInQuote * sdcRewardPerYear / lpTotalInQuoteToken
        let apy = sdcPriceVsBNB.times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apy = sdcPriceVsBNB.times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apy = sdcPrice.div(ethPriceUsd).times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.SDC) {
          apy = sdcRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const sdcApy =
            farm && sdcPriceVsBNB.times(sdcRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = sdcApy && dualApy && sdcApy.plus(dualApy)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          sdcPrice={sdcPrice}
          ethPrice={ethPriceUsd}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [farmsLP, bnbPrice, ethPriceUsd, sdcPrice, ethereum, account],
  )

  return (
    <Page>
      <FarmHeader>
        <HeadingFarm as="h1" size="lg" color="secondary" mb="25px">
          {TranslateString(696, 'Stake LP tokens to earn SDC')}
        </HeadingFarm>
        <FarmTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      </FarmHeader>
      <FlexLayout>
        <Route exact path={`${path}`}>
          {stackedOnly ? farmsList(stackedOnlyFarms, false) : farmsList(activeFarms, false)}
        </Route>
        <Route exact path={`${path}/history`}>
          {farmsList(inactiveFarms, true)}
        </Route>
      </FlexLayout>
    </Page>
  )
}

export default Farms
