import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { Flex } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'
import Balance from 'components/Balance'



interface Props {
  isOpenDetail: boolean
  projectLink: string
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 0 30px 24px 30px;
`

const Details = styled.div`
  margin-top: 24px;
  float: right;
  width: 25%;
  @media (max-width: 968px) {
    float: none;
    width: 100%;
  }
 margin-bottom: 10px;
`


const Label = styled.div`
  font-size: 16px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #12aab5;
`
const LabelFooter = styled(Label)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  isOpenDetail,
}) => {
  const TranslateString = useI18n()
  return (
    <StyledFooter isFinished={isFinished}>
      {isOpenDetail && (
        <Details>
          <Flex justifyContent='space-between'>
            <LabelFooter>
              {TranslateString(408, 'Total')}:
              </LabelFooter>
            <Balance fontSize="16px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />
          </Flex>
          {blocksUntilStart > 0 && (
            <Flex justifyContent='space-between'>
              <LabelFooter>{TranslateString(410, 'Start')}:</LabelFooter>
              <Balance fontSize="16px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Flex>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Flex justifyContent='space-between'>
              <LabelFooter>{TranslateString(410, 'End')}:</LabelFooter>
              <Balance fontSize="16px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Flex>
          )}
          <Flex justifyContent='space-between'>
            <TokenLink href={projectLink} target="_blank">
              {TranslateString(412, 'View project site')}
            </TokenLink>
          </Flex>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
