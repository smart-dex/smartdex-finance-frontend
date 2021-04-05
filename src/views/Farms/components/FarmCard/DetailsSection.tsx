import React, { useState } from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import { Text, Flex, Button, Link } from 'uikit-sotatek'
import { lightColors, darkColors, baseColors } from 'style/Color'
import BigNumber from 'bignumber.js'
import { useFarmUser } from 'state/hooks'

interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  earnings?: BigNumber
  pid: number
  poolRate:BigNumber,
  quoteTokenSymbol:string
  tokenSymbol:string
  lpTokenBalanceMC:BigNumber,
  lpTotalSupply:BigNumber,
  tokenBalanceLP:BigNumber
  quoteTokenBlanceLP:BigNumber
}




const StyledText = styled(Text)`
  align-self: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  font-weight: 600;
  font-size: 14px;
  line-height: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledTextInfo = styled(Text)`
  font-weight: 500;
  line-height: 25px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 12px;
  }
`

const ButtonClaim = styled(Button)`
  background: #17C267;
  box-shadow: 0px 4px 10px rgba(23, 194, 103, 0.24);
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
  height:40px;
  width:96px;
  margin-bottom:8px;
  align-self: flex-end;
`
const StyledLink = styled(Link)`
  margin-top: 16px;
  color: ${baseColors.primary};
  display: inline;
  font-weight: 600;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  totalValueFormated,
  lpLabel,
  earnings,
  pid,
  bscScanAddress,
  poolRate,
  quoteTokenSymbol,
  tokenSymbol,
  lpTokenBalanceMC,
  lpTotalSupply,
  tokenBalanceLP,
  quoteTokenBlanceLP
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const rawEarningsBalance = getBalanceNumber(earnings)
  const { onReward } = useHarvest(pid)
  const {  stakedBalance,tokenBalance } = useFarmUser(pid)
  const totalYourPoolToken = stakedBalance.plus(tokenBalance)
  const rawTotalYourPoolToken= getFullDisplayBalance(totalYourPoolToken)
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayPoolRate = poolRate.toFixed(2).toString()
  const yourPoolShare = totalYourPoolToken.div(lpTotalSupply)
  const displayYourPoolShare =  yourPoolShare.times(100).toFixed(2)
  const displayTokenBalanceLp = (getBalanceNumber(tokenBalanceLP)*yourPoolShare.toNumber()).toFixed(2)
  const displayQuoteTokenBlanceLP = (getBalanceNumber(quoteTokenBlanceLP)*yourPoolShare.toNumber()).toFixed(2)
  return (
    <>
      <Flex flexDirection="column">
        <StyledText style={{ alignSelf: 'start',marginBottom:'14px' }}>{TranslateString(999, 'Your Liquidity deposits')}:</StyledText>
        <Flex>
          <StyledText style={{ flex: '1' }}>{rawStakedBalance}</StyledText>
          <StyledTextInfo style={{alignSelf: 'center'}}>{lpLabel}</StyledTextInfo>
        </Flex>
      </Flex>
      <Flex mt="21px" mb="22px">
        <Flex flexDirection="column" style={{ flex: '1' }} >
          <StyledText style={{ alignSelf: 'start' }} marginBottom='20px' marginTop='-4px'>{TranslateString(999, 'Your unclaimed SDC')}:</StyledText>
          <StyledText style={{ alignSelf: 'start' }}>{rawEarningsBalance}</StyledText>
        </Flex>
        <Flex flexDirection="column">
          <ButtonClaim
            disabled={rawEarningsBalance === 0 || pendingTx}
            isDisable={rawEarningsBalance === 0 || pendingTx}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
          >{TranslateString(999, 'Claim')}</ButtonClaim>
          <StyledTextInfo>{displayPoolRate} SDC/ {TranslateString(999, 'WEEK')}</StyledTextInfo>
        </Flex>
      </Flex>

      <Flex>
          <StyledTextInfo>{TranslateString(999, 'Your total pool token')}: {rawTotalYourPoolToken}</StyledTextInfo>
      </Flex>
      <Flex>
          <StyledTextInfo>{TranslateString(999, 'Pool token in rewards')}: {lpTokenBalanceMC}</StyledTextInfo>
      </Flex>
      <Flex>
          <StyledTextInfo>{TranslateString(999, 'Pooled')} {tokenSymbol}: {displayTokenBalanceLp}</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pooled')} {quoteTokenSymbol}: {displayQuoteTokenBlanceLP}</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Your pool share')}: {displayYourPoolShare} %</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Total USD')}: {totalValueFormated}</StyledTextInfo>
      </Flex>
      <Flex justifyContent="flex-start">
        <StyledLink external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </StyledLink>
      </Flex>
    </>
  )
}

export default DetailsSection
