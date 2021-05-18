import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import stakingRewardsABI from 'config/abi/stakingRewards.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAddress = getAddress(farmConfig.lpAddresses)
      const stakingAddress = getAddress(farmConfig.stakingAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(farmConfig.token.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(farmConfig.quoteToken.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the staking reward contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [stakingAddress],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(farmConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(farmConfig.quoteToken.address),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBalanceLP,
        lpTokenBalanceSR,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)
      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceSR).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)
      const priceRate = new BigNumber(quoteTokenBalanceLP).div(new BigNumber(tokenBalanceLP))
      const [rewardDuration, rewardDistribution, rewardRate] = await multicall(stakingRewardsABI, [
        {
          address: stakingAddress,
          name: 'rewardsDuration',
        },
        {
          address: stakingAddress,
          name: 'rewardsDistribution',
        },
        {
          address: stakingAddress,
          name: 'rewardRate',
        },
      ])

      const totalLPDeposits = new BigNumber(lpTokenBalanceSR)
      const rawLpTotalSupply = new BigNumber(lpTotalSupply)
      const rawTokenBalanceLP= new BigNumber(tokenBalanceLP)
      const rawQuoteTokenBalanceLP = new BigNumber(quoteTokenBalanceLP)
      const sdcPerYear = new BigNumber(rewardRate)
        .div(new BigNumber(10).pow(18))
        .times(60).times(60).times(24).times(365)

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        lpTotalSupply: rawLpTotalSupply.toJSON(),
        tokenBalanceLP: rawTokenBalanceLP.toJSON(),
        quoteTokenBalanceLP: rawQuoteTokenBalanceLP.toJSON(),
        lpTokenBalanceSR: totalLPDeposits.toJSON(),
        rewardRate: rewardRate.toString(),
        sdcPerYear: sdcPerYear.toString(),
        priceRate:priceRate.toJSON()
      }
    }),
  )
  return data
}

export default fetchFarms
