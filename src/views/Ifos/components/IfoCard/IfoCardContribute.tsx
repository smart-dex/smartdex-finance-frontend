import React, { useState, useEffect } from 'react'
import { useModal, Button, Text } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'




export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  tokenDecimals: number
}
const CardLabel = styled.div`
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 50%;
  }
  width: 100%;
  color: ${baseColors.colorbt};
  padding-top: 15px;
  label{
    color: ${baseColors.colorbt} !important;
  }
  & button{
    background: ${baseColors.primary};
    box-shadow: none;
    &:disabled{
      background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
      color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
    }
  
  }
`
const CardButton= styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > button{
    width: 40%;  
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 20%;
    }
  }
  .disabled {
    color: ${lightColors.btnApp};
    background: ${({ theme }) => (theme.isDark ? darkColors.btnDisabledBg : lightColors.btnDisabledBg)};
    cursor: not-allowed;
    box-shadow: none;
    &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
      opacity: 1;
    }
    &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
      opacity: 1
    }
  }
`

const ButtonApp = styled(Button)`
  background: ${baseColors.primary};
  padding: 0px 20px;
  margin-top: 15px;
  margin-right: 15px;
`
const TextNote = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  margin-top: 10px;
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userInfo, setUserInfo] = useState({ amount: 0, claimed: false })

  const { account } = useWallet()
  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      const balance = new BigNumber(await contract.methods.getOfferingAmount(account).call())
      const userinfo = await contract.methods.userInfo(account).call()

      setUserInfo(userinfo)
      setOfferingTokenBalance(balance)
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  if (allowance === null) {
    return null
  }

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }
  const isFinished = status === 'finished'
  const percentOfUserContribution = new BigNumber(userInfo.amount).div(raisingAmount).times(100)

  if (allowance <= 0) {
    return (
      <CardButton>
          <ButtonApp
            className={pendingTx ? "disabled" : ""}
            onClick={async () => {
              try {
                if (!pendingTx) {
                  setPendingTx(true)
                  await onApprove()
                  setPendingTx(false)
                }
              } catch (e) {
                setPendingTx(false)
                console.error(e)
              }
            }}
          >
          Approve
        </ButtonApp>
      </CardButton>
      
    )
  }

  return (
    <CardLabel>
        <LabelButton
          disabled={pendingTx || userInfo.claimed || (isFinished &&  getBalanceNumber(offeringTokenBalance, tokenDecimals) === 0)}
          buttonLabel={isFinished ? 'Claim' : 'Contribute'}
          label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            isFinished
              ? userInfo.claimed
                ? 'Claimed'
                : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
              : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
          }
          onClick={isFinished ? claim : onPresentContributeModal}
        />
    
        <TextNote>
          {isFinished
            ? `You'll be refunded any excess tokens when you claim`
            : `${percentOfUserContribution.toFixed(5)}% of total`}
        </TextNote>
      </CardLabel>
  )
}

export default IfoCardContribute
