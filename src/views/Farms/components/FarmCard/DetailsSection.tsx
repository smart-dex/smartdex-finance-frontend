import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
}


const StyledLinkExternal = styled(LinkExternal)`
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
    color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
    width: fit-content;
    background:none;
    svg {
    padding-left: 4px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledText = styled(Text)`
  align-self: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  font-weight: 600;
  font-size: 12px;
  line-height: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const StyledLink = styled(Link)`
  font-size: 13px;
  text-decoration: revert;
  color: #0085FF;
  font-weight: 600;
  line-height: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <Flex justifyContent="space-between">
        <StyledText>{TranslateString(316, 'Stake')}:</StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <StyledText>{TranslateString(23, 'Total Liquidity')}:</StyledText>
          <StyledText>{totalValueFormated}</StyledText>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <StyledLink external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </StyledLink>
      </Flex>
   </>
  )
}

export default DetailsSection
