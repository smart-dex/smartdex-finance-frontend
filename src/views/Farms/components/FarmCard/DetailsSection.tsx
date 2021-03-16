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

const Wrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  float: none;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    float: right;
    width: 25%;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  display: flex;
  align-items: center;
  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`
const StyledDetailSection = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.dividerCard : lightColors.dividerCard)};
  padding: 0 30px 24px 30px;
`
const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
`
const StyledLink = styled(Link)`
  font-size: 16px;
  text-decoration: revert;
  color: rgb(31, 199, 212);
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
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
    <StyledDetailSection>
      <Wrapper>
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
      </Wrapper>
    </StyledDetailSection>
  )
}

export default DetailsSection
