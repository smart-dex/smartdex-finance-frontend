import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Button } from 'smartdex-uikit' 
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from '../../../../style/Color'

interface PastLotterySearcherProps {
  initialLotteryNumber: number
  onSubmit: (num: number) => void
}

const Wrapper = styled.div`
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: flex;
    justify-content: space-between;
  }
  form {
    width: 100%;
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 70%;
    }
  }
`

const SearchWrapper = styled.div`
  position: relative;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
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
  font-size: 14px;
  font-weight: 500;
  padding-top: 8px;
  margin-bottom: 6px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 0px;
  }
`

const InputStyle = styled(Input)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  background-color: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.invertedContrast)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  border-radius: 50px;
  box-shadow: none;
  padding: 0 42px 0 16px;
  appearance: none;
  &:focus:not(:disabled) {
    box-shadow: none !important;
  }
`
const ButtonStyle = styled(Button)`
  background: ${baseColors.primary};
  border-radius: 50px;
  box-shadow: 0px 4px 10px rgba(197, 197, 197, 0.24);
  width: 36px;
  height: 36px;
  padding: 0 10px;
  &: hover {
    background-color: ${baseColors.primary} !important;
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
  const eventKeyPress = (event) => {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  return (
    <Wrapper>
      <TextStyle>{TranslateString(742, 'Select lottery number:')}</TextStyle>
      <form onSubmit={handleSubmit}>
        <SearchWrapper>
          <InputStyle
            value={lotteryNumber < 0 ? 1 : lotteryNumber}
            type="number"
            isWarning={isError}
            onChange={handleChange}
            onKeyPress={eventKeyPress}
          />
          <ButtonWrapper>
            <ButtonStyle type="submit" size="sm">
              <img src="/images/search.png" alt="" style={{ width: '20px' }} />
            </ButtonStyle>
          </ButtonWrapper>
        </SearchWrapper>
      </form>
    </Wrapper>
  )
}
export default PastLotterySearcher
