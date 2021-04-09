import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Link } from 'uikit-sotatek'
import { darkColors, lightColors, baseColors } from 'style/Color'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  sdcToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`
const Item = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`
const Text = styled('div')`
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  width: 160px;
  text-align: left;
  @media (max-width: 767px) {
    width: 120px;
  }
  & > a {
    color: ${baseColors.primary};
    font-size: 13px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    line-height: 20px;
    & > a {
      font-size: 16px;
    }
  }
`
const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchDate,
  launchTime,
  saleAmount,
  raiseAmount,
  sdcToBurn,
  raisingAmount,
  totalAmount,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{TranslateString(582, 'Launch Time')}</Display>
          <Text>
            {launchDate},
            <Link
              href={`${process.env.REACT_APP_TIME_DATE}`}
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <Text>{saleAmount}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'To raise (USD)')}</Display>
          <Text>{raiseAmount}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(586, 'SDC to burn (USD)')}</Display>
          <Text>{sdcToBurn}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'Total raised (% of target)')}</Display>
          <Text>{totalAmount.div(raisingAmount).times(100).toFixed(2) !== 'NaN' ? totalAmount.div(raisingAmount).times(100).toFixed(2) : '0'}%</Text>
        </Item>
      </StyledIfoCardDetails>
    </>
  )
}
export default IfoCardDetails
