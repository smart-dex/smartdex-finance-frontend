import React from 'react'
import BigNumber from 'bignumber.js'
import styled, { css } from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { Flex } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'
import Balance from 'components/Balance'
import {registerToken} from 'utils/wallet'
import { BASE_URL } from 'config'

interface Props {
  isOpenDetail: boolean
  projectLink: string
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  tokenName: string
  tokenAddress: string
  tokenDecimals: number
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  width:100%;
  order: 6;
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  padding: 0px 23px 22px 22px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 0px 23px 22px 22px;
  }
`

const Details = styled.div`
`

const Label = styled.div`
  font-size: 16px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: revert;
  color: #0085FF;
  cursor: pointer;
`
const LabelFooter = styled(Label)<{ isDisabled: boolean }>`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
    `}
    font-weight: 500;
    line-height: 25px;
`
const Detail = styled(Flex)`
    margin-top:10px;
    margin-bottom:10px;
`

const CardFooter: React.FC<Props> = ({
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  isOpenDetail,
  tokenAddress,
  tokenName,
  tokenDecimals,
  projectLink
}) => {
  const TranslateString = useI18n()
  const imageSrc = `${BASE_URL}/images/tokens/${tokenName.toLowerCase()}.png`
  return (
    <StyledFooter isFinished={isFinished}>
      {isOpenDetail && (
        <Details>
          <Detail justifyContent="space-between" alignItems='center'>
            <LabelFooter isDisabled={isFinished}>{TranslateString(408, 'Total')}:</LabelFooter>
            <Balance fontSize="16px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />
          </Detail>
          {blocksUntilStart > 0 && (
            <Detail justifyContent="space-between" alignItems='center'>
              <LabelFooter isDisabled={isFinished}>{TranslateString(410, 'Start')}:</LabelFooter>
              <Balance fontSize="16px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Detail>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Detail justifyContent="space-between" alignItems='center'>
              <LabelFooter isDisabled={isFinished}>{TranslateString(410, 'End')}:</LabelFooter>
              <Balance fontSize="16px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Detail>
          )}
           {tokenAddress && (
            <Flex mb="10px">
              <TokenLink onClick={() => registerToken(tokenAddress, tokenName, tokenDecimals, imageSrc)}>
                Add {tokenName} to Metamask
              </TokenLink>
            </Flex>
          )}
          <Flex justifyContent="space-between" alignItems='center'>
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
