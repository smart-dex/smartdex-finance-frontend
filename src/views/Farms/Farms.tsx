import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
// import { BLOCKS_PER_YEAR, SDC_PER_BLOCK, SDC_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceSdcBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
// import { QuoteToken } from 'config/constants/types'
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
  const [active, setActive] = useState(true)

  const activeFarms = farmsLP
  const inactiveFarms = []
  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        const sdcPriceInQuote = new BigNumber(farm.tokenPriceVsQuote)
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const sdcRewardPerYear = farm.sdcPerYear

        // sdcPriceInQuote * sdcRewardPerYear / lpTotalInQuoteToken
        const apy = sdcPriceInQuote.times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken)

        // if (farm.dual) {
        //   console.log("a")
        //   const sdcApy =
        //     farm && sdcPriceInQuote.times(sdcRewardPerYear).div(farm.lpTotalInQuoteToken)
        //   const dualApy =
        //     sdcPriceInQuote &&
        //     new BigNumber(sdcPriceInQuote)
        //       .times(farm.dual.sdcRewardPerYear)
        //       .div(farm.lpTotalInQuoteToken)

        //   apy = sdcApy && dualApy && sdcApy.plus(dualApy)
        // }

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
    [bnbPrice, ethPriceUsd, sdcPrice, ethereum, account],
  )

  return (
    <Page>
      <FarmHeader>
        <HeadingFarm as="h1" size="lg" color="secondary" mb="25px">
          {TranslateString(696, 'Stake LP tokens to earn SDC')}
        </HeadingFarm>
        <FarmTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} active={active} setActive={setActive} />
      </FarmHeader>
      <FlexLayout>
        <Route exact path={`${path}`}>
          {!active && farmsList(inactiveFarms, true)}
          {stackedOnly && active && farmsList(stackedOnlyFarms, false) }
          {!stackedOnly && active &&     farmsList(activeFarms, false) }
        </Route>
      </FlexLayout>
    </Page>
  )
}

export default Farms
