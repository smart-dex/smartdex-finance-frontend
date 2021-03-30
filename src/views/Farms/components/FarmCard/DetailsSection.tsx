import React, { useState } from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import { Text, Flex, Button, Link } from 'uikit-sotatek'
import { lightColors, darkColors, baseColors } from 'style/Color'
import BigNumber from 'bignumber.js'

interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  earnings?: BigNumber
  pid: number
}


// const StyledLinkExternal = styled(LinkExternal)`
//     font-size: 13px;
//     ${({ theme }) => theme.mediaQueries.nav} {
//       font-size: 16px;
//     }
//     color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
//     width: fit-content;
//     background:none;
//     svg {
//     padding-left: 4px;
//     width: auto;
//     fill: ${({ theme }) => theme.colors.primary};
//   }
// `

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
    font-size: 14px;
  }
`
// const StyledLink = styled(Link)`
//   font-size: 13px;
//   text-decoration: revert;
//   color: #0085FF;
//   font-weight: 600;
//   line-height: 30px;
//   ${({ theme }) => theme.mediaQueries.nav} {
//     font-size: 16px;
//   }
// `
const ButtonClaim = styled(Button)`
  background: #17C267;
  box-shadow: 0px 4px 10px rgba(23, 194, 103, 0.24);
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
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
  bscScanAddress
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const rawEarningsBalance = getBalanceNumber(earnings)
  const { onReward } = useHarvest(pid)
  return (
    <>
      <Flex flexDirection="column">
        <StyledText style={{ alignSelf: 'start' }}>{TranslateString(999, 'Your Liquidity deposits')}:</StyledText>
        <Flex>
          <StyledText style={{ flex: '1' }}>{totalValueFormated}</StyledText>
          <StyledTextInfo>{lpLabel}</StyledTextInfo>
        </Flex>
      </Flex>
      <Flex>
        <Flex flexDirection="column" style={{ flex: '1' }}>
          <StyledText style={{ alignSelf: 'start' }} marginBottom='16px'>{TranslateString(999, 'Your unclaimed SDC')}:</StyledText>
          <StyledText style={{ alignSelf: 'start' }}>{totalValueFormated}</StyledText>
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
          <StyledTextInfo>1,111 SDC/WEEK</StyledTextInfo>
        </Flex>
      </Flex>

      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Your total pool token')}: 345,0000</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pool token in rewards')}: 345,0000</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pooled SDC')}: 12,50000</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Pooled DDD')}: 90,0000</StyledTextInfo>
      </Flex>
      <Flex>
        <StyledTextInfo>{TranslateString(999, 'Your pool share')}: 15,432%</StyledTextInfo>
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
