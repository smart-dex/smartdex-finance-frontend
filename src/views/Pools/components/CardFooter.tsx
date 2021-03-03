import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
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
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 0 30px 24px 30px;
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
`

const Label = styled.div`
  font-size: 16px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #12aab5;
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
          <Row>
            <Label>
              {TranslateString(408, 'Total')}:
              </Label>
            <Balance fontSize="16px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />
          </Row>
          {blocksUntilStart > 0 && (
            <Row>
            
              <Label>{TranslateString(410, 'Start')}:</Label>
              <Balance fontSize="16px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Row>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Row>

              <Label>{TranslateString(410, 'End')}:</Label>

              <Balance fontSize="16px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Row>
          )}
          <Row>
            <TokenLink href={projectLink} target="_blank">
              {TranslateString(412, 'View project site')}
            </TokenLink>
          </Row>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
