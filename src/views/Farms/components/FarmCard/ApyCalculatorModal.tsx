import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import { Modal, Text, LinkExternal, Flex } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'


interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  cakePrice?: BigNumber
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
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  cakePrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber()

  const cakeEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 1, farmApy, cakePrice })
  const cakeEarnedPerThousand7D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 7, farmApy, cakePrice })
  const cakeEarnedPerThousand30D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 30, farmApy, cakePrice })
  const cakeEarnedPerThousand365D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 365, farmApy, cakePrice })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
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
            {TranslateString(864, 'CAKE per $1000')}
          </TextStyled>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <TextStyled>1d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{cakeEarnedPerThousand1D}</TextStyled>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <TextStyled>7d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{cakeEarnedPerThousand7D}</TextStyled>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <TextStyled>30d</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{cakeEarnedPerThousand30D}</TextStyled>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <TextStyled>365d(APY)</TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </TextStyled>
        </GridItem>
        <GridItem>
          <TextStyled>{cakeEarnedPerThousand365D}</TextStyled>
        </GridItem>
      </Grid>
      <DescriptionStyled fontSize="12px" color="textSubtle">
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
    </Modal>
  )
}
const TextStyled = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const DescriptionStyled = styled(Description)`
color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
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
    padding-left: 4px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`
export default ApyCalculatorModal
