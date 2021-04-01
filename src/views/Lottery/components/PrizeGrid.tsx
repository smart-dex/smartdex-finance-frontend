import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from 'uikit-sotatek'
import { darkColors, lightColors } from 'style/Color'

export interface PrizeGridProps {
  lotteryPrizeAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  oneTicketMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}
const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  ${({ theme }) => theme.mediaQueries.nav} {
    grid-template-columns: 1fr 4fr 1fr;
   }

`
const RightAlignedText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
   font-size: 14px;
  }
`

const RightAlignedHeading = styled(Heading)`
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
   }
`

const TextStyleThree = styled(Text)`
color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
   }

`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`
const PastDrawGridItem = styled(GridItem)`
  
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  padding-left: 8px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding-left: 18px;
   }
`

const HeadingStyle = styled(Heading)`
   text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
   }
`

const RightAlignedBurn = styled(Text)`
text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
   }
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  lotteryPrizeAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(0)
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(0)
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const TranslateString = useI18n()
  return (
    <Grid pastDraw={pastDraw} style={{ padding: '8px'}}>
      <GridItem style={{ textAlign: 'center'}}>
        <RightAlignedText>{TranslateString(756, 'No. Matched')}</RightAlignedText>
      </GridItem>
      {pastDraw ? (
        <PastDrawGridItem>
          <RightAlignedText>{TranslateString(754, 'Winners')}</RightAlignedText>
        </PastDrawGridItem>
      ) :  <PastDrawGridItem />}
      <GridItem>
        <RightAlignedText>{TranslateString(752, 'Prize Pot')}</RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <HeadingStyle >4</HeadingStyle>
      </GridItem>
      {pastDraw ? (
        <PastDrawGridItem>
          <RightAlignedHeading >{jackpotMatches}</RightAlignedHeading>
        </PastDrawGridItem>
      ) : <PastDrawGridItem />}
      <GridItem>
        <RightAlignedHeading >{fourMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <TextStyleThree bold>3</TextStyleThree>
      </GridItem>
      {pastDraw ? (
        <PastDrawGridItem>
          <TextStyleThree bold>{threeTicketMatches}</TextStyleThree>
        </PastDrawGridItem>
      ) : <PastDrawGridItem />}
      <GridItem>
        <TextStyleThree>{threeMatchesAmount.toLocaleString()}</TextStyleThree>
      </GridItem>
      {/* 2 matches row */}
      <GridItem>
        <RightAlignedText>2</RightAlignedText>
      </GridItem>
      {pastDraw ? (
        <PastDrawGridItem>
          <RightAlignedText>{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      ) : <PastDrawGridItem />}
      <GridItem>
        <RightAlignedText>{twoMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <TextStyle >{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}</TextStyle>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedBurn>{burnAmount.toLocaleString()}</RightAlignedBurn>
          </GridItem>
        </>
      ) : (
        <>
        <GridItem marginBottom="0" />
        <GridItem marginBottom="0">
          <RightAlignedBurn>{burnAmount.toLocaleString()}</RightAlignedBurn>
        </GridItem>
        </>
      )}
    </Grid>
  )
}
export default PrizeGrid