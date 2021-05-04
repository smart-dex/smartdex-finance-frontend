import React, {  useEffect } from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import { Text, Flex, Button, Link } from 'smartdex-uikit'
import ReactTooltip from 'react-tooltip'
import { lightColors, darkColors, baseColors } from 'style/Color'
import BigNumber from 'bignumber.js'
import { useFarmUser } from 'state/hooks'
import Balance from 'components/Balance'



interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValue?: BigNumber
  lpLabel?: string
  addLiquidityUrl?: string
  earnings?: BigNumber
  pid: number
  poolRate: BigNumber,
  quoteTokenSymbol: string
  tokenSymbol: string
  lpTokenBalanceMC: BigNumber,
  lpTotalSupply: BigNumber,
  tokenBalanceLP: BigNumber
  quoteTokenBlanceLP: BigNumber,
  pendingTx: boolean,
  setPendingTx: (pendingTx: boolean) => void
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
  white-space: nowrap;
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
const BalanceAndCompound = styled.div`
  display: flex;
  flex: 1;
  >div{
    max-width:100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-right: 5px;
    color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
  }
`
const DetailStyled = styled.div`
justify-content: flex-end;
display: flex;
margin-left:5px;
font-weight: 500;
line-height: 25px;
flex-wrap:wrap;
color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
font-size: 12px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 12px;
  
}
>span{
  margin-left:5px;
}
  >div{
    max-width:120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  
    font-weight: 500;
    line-height: 25px;
    color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
    font-size: 12px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 12px;
    }
  }`
const StylePoolRate = styled(Flex)`
  max-width:100px;
  `

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  totalValue,
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
  quoteTokenBlanceLP,
  pendingTx,
  setPendingTx
}) => {
  const TranslateString = useI18n()
  useEffect(() => {
    ReactTooltip.rebuild();
});
  const rawEarningsBalance = getBalanceNumber(earnings)
  const { onReward } = useHarvest(pid)
  const { stakedBalance, tokenBalance } = useFarmUser(pid)
  const totalYourPoolToken = stakedBalance.plus(tokenBalance)
  const rawTotalYourPoolToken = getBalanceNumber(totalYourPoolToken)
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayPoolRate = poolRate.toNumber()
  const yourPoolShare = totalYourPoolToken.div(lpTotalSupply)
  const displayYourPoolShare = yourPoolShare.times(100).toNumber().toLocaleString('en-US')
  const displayTokenBalanceLp = getBalanceNumber(tokenBalanceLP) 
  const displayQuoteTokenBlanceLP = (getBalanceNumber(quoteTokenBlanceLP))
  const displayLpTokenBalanceMC = getBalanceNumber(lpTokenBalanceMC)
  const totalValueFormated = totalValue
  ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  : '-'
  const totalValueTooltip = totalValue ?   Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })
  : 0
  return (
    <>
      
      <Flex flexDirection="column">
        <StyledText style={{ alignSelf: 'start', marginBottom: '14px' }}>{TranslateString(999, 'Your Liquidity deposits')}</StyledText>
        <Flex>
          <BalanceAndCompound data-tip={rawStakedBalance.toLocaleString('en-US')}>
            <Balance fontSize="32px" value={rawStakedBalance} />
          </BalanceAndCompound>
          <StyledTextInfo style={{ alignSelf: 'center' }}>{lpLabel}</StyledTextInfo>
        </Flex>
      </Flex>
      <Flex mt="21px" mb="22px">
        <Flex flexDirection="column" style={{ flex: '1' }} >
          <StyledText style={{ alignSelf: 'start' }} marginBottom='20px' marginTop='-4px'>{TranslateString(999, 'Your unclaimed SDC')}</StyledText>
          <BalanceAndCompound data-tip={rawEarningsBalance.toLocaleString('en-US')}>
            <Balance value={rawEarningsBalance} />
          </BalanceAndCompound>
        </Flex>
        <StylePoolRate flexDirection="column">
          <ButtonClaim
            disabled={rawEarningsBalance === 0 || pendingTx}
            isDisable={rawEarningsBalance === 0 || pendingTx}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onReward()
              } catch (e) {
                console.error(e)
              } finally{
                setPendingTx(false)
              }
            }}
          >{TranslateString(999, 'Claim')}</ButtonClaim>
          <DetailStyled data-tip={displayPoolRate.toLocaleString('en-US')}>
            <Balance value={displayPoolRate} /> <span>SDC/{TranslateString(999, 'WEEK')}</span>
          </DetailStyled>
        </StylePoolRate>
      </Flex>

      <Flex>
        <StyledTextInfo>
          {TranslateString(999, 'Your total pool token')}:
        </StyledTextInfo>
        <DetailStyled data-tip={rawTotalYourPoolToken.toLocaleString('en-US')}>
          <Balance value={rawTotalYourPoolToken} /> <span>{lpLabel}</span>
        </DetailStyled>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pool token in rewards')}:</StyledTextInfo>
        <DetailStyled data-tip={displayLpTokenBalanceMC.toLocaleString('en-US')}>
          <Balance value={displayLpTokenBalanceMC} />  <span>{lpLabel}</span>
        </DetailStyled>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pooled')} {tokenSymbol}:
        </StyledTextInfo>
        <DetailStyled data-tip={displayTokenBalanceLp.toLocaleString('en-US')}>
          <Balance value={displayTokenBalanceLp} />   <span>{tokenSymbol}</span>
        </DetailStyled>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pooled')} {quoteTokenSymbol}:
        </StyledTextInfo>
        <DetailStyled data-tip={displayQuoteTokenBlanceLP.toLocaleString('en-US')}>
          <Balance value={displayQuoteTokenBlanceLP} />  <span>{quoteTokenSymbol}</span>
        </DetailStyled>

      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Your pool share')}: <span data-tip={displayYourPoolShare}>{displayYourPoolShare}</span> %</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Total USD')}: <span data-tip={totalValueTooltip}>{totalValueFormated}</span></StyledTextInfo>
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
