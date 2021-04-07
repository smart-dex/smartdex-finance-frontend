import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import { Modal, Text, LinkExternal, Flex } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { calculateSdcEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'


interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  sdcPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: 10px;
  margin-left: 20px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  sdcPrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfSdc = 1000 / sdcPrice.toNumber()

  const sdcEarnedPerThousand1D = calculateSdcEarnedPerThousandDollars({ numberOfDays: 1, farmApy, sdcPrice })
  const sdcEarnedPerThousand7D = calculateSdcEarnedPerThousandDollars({ numberOfDays: 7, farmApy, sdcPrice })
  const sdcEarnedPerThousand30D = calculateSdcEarnedPerThousandDollars({ numberOfDays: 30, farmApy, sdcPrice })
  const sdcEarnedPerThousand365D = calculateSdcEarnedPerThousandDollars({ numberOfDays: 365, farmApy, sdcPrice })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Wrapmodal>
      <Grid>
        <GridItem>
          <TextStyled fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(860, 'Timeframe')}
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(858, 'ROI')}
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(864, 'SDC per $1000')}
          </TextStyled>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <TextStyled>1d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: sdcEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfSdc })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{sdcEarnedPerThousand1D}</TextStyled>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <TextStyled>7d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: sdcEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfSdc })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{sdcEarnedPerThousand7D}</TextStyled>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <TextStyled>30d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: sdcEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfSdc })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{sdcEarnedPerThousand30D}</TextStyled>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <TextStyled>365d(APY)</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: sdcEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfSdc })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{sdcEarnedPerThousand365D}</TextStyled>
        </GridItem>
      </Grid>
      <DescriptionStyled>
        {TranslateString(
          866,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </DescriptionStyled>
      <Flex justifyContent="center">
        <StyledLinkExternal href={addLiquidityUrl}>
          {TranslateString(999, 'Get')} {lpLabel}
        </StyledLinkExternal>
      </Flex>
      </Wrapmodal>
    </Modal>
  )
}
const Wrapmodal = styled.div`
  max-width: 100%;
  overflow-y: auto;
`

const TextStyled = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const DescriptionStyled = styled.div`
  margin: auto;
  width: 100%;
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align:center;
  justify-content: center; 
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    max-width: 500px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    min-width: 100%;
  }
 
`
const StyledLinkExternal = styled(LinkExternal)`
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
    color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
    width: fit-content;
    background:none;
    svg {
    margin-left:6px;
    width: auto;
    // fill: ${({ theme }) => theme.colors.primary};
    }
`
export default ApyCalculatorModal
