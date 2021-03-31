import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from 'uikit-sotatek'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools, usePriceEthBnb } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PoolHeader from './components/PoolHeader'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const ethPriceBnb = usePriceEthBnb()
  const block = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    // TO-DO: SDC-BNB must hame farmID = 1 !!!
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // temp multiplier to support ETH farms
    // Will be removed after the price api
    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    const rewardTokenPriceInBNB = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )

    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const stackedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  return (
    <Page>
      <PoolHeader>
        <ContentHeader>
          <HeadingPage as="h1" size="lg" mb="14px">
            {TranslateString(738, 'Syrup Pool')}
          </HeadingPage>
          <DescriptionHeading>
            <span> {TranslateString(580, 'Stake SDC to earn new tokens.')} </span>
            <span> {TranslateString(486, 'You can unstake at any time.')}</span>
            <span> {TranslateString(406, 'Rewards are calculated per block.')}</span>
          </DescriptionHeading>
        </ContentHeader>
        <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      </PoolHeader>
      <FlexLayout>
      <Route exact path={`${path}`}>
        <>
          {stackedOnly
            ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
            : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
        </>
      </Route>
      <Route path={`${path}/history`}>
        {orderBy(finishedPools, ['sortOrder']).map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} />
        ))}
      </Route>
      </FlexLayout>
      <Route exact path={`${path}`}>
        <Coming />
      </Route>
    </Page>
  )
}

const HeadingPage = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  font-weight: bold;
  font-size: 16px;
  line-height: 29px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

const DescriptionHeading = styled.div`
  font-family: Montserrat;
  font-size: 13px;
  line-height: 143%;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const ContentHeader = styled.div`
  margin-bottom: 21px;
`

export default Farm
