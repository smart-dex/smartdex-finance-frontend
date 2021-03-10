import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from '../../../../style/Color'

interface PastLotterySearcherProps {
  initialLotteryNumber: number
  onSubmit: (num: number) => void
}

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const SearchWrapper = styled.div`
  position: relative;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0%, -50%);
  width: auto;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const InputStyle = styled(Input)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  background-color: ${({ theme }) => (theme.isDark ? '#2A3145' : '#FFFFFF')};
  border: 1px solid ${({ theme }) => (theme.isDark ? '#2F344B' : '#E2E2E8')};
  border-radius: 50px;
`
const ButtonStyle = styled(Button)`
  background: rgba(95, 94, 118, 0.5);
  border-radius: 50px;
  box-shadow: 0px 4px 10px rgba(197, 197, 197, 0.24);
  width: 36px;
  height: 36px;
  padding: 0 10px;
  &: hover {
    background-color: #0085ff !important;
  }
`

const PastLotterySearcher: React.FC<PastLotterySearcherProps> = ({ initialLotteryNumber, onSubmit }) => {
  const [lotteryNumber, setLotteryNumber] = useState(initialLotteryNumber)
  const [isError, setIsError] = useState(false)
  const TranslateString = useI18n()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    onSubmit(lotteryNumber)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.currentTarget.value, 10)

    // The max value will always be the initialLotterNumber which equals
    // the latest lottery round
    setIsError(value > initialLotteryNumber)
    setLotteryNumber(value)
  }

  return (
    <Wrapper>
      <TextStyle>{TranslateString(742, 'Select lottery number:')}</TextStyle>
      <form onSubmit={handleSubmit}>
        <SearchWrapper>
          <InputStyle
            value={lotteryNumber}
            type="number"
            isWarning={isError}
            max={initialLotteryNumber}
            onChange={handleChange}
          />
          <ButtonWrapper>
            <ButtonStyle type="submit" size="sm" disabled={isError}>
              <img src="/images/search.png" alt="" style={{ width: '20px' }} />
            </ButtonStyle>
          </ButtonWrapper>
        </SearchWrapper>
      </form>
    </Wrapper>
  )
}

export default PastLotterySearcher
