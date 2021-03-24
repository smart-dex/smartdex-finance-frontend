import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardRibbon, LinkExternal } from 'uikit-sotatek'
import { darkColors, lightColors } from 'style/Color'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import makeBatchRequest from 'utils/makeBatchRequest'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { useIfoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardTime from './IfoCardTime'
import IfoCardContribute from './IfoCardContribute'
import { ButtonPrimary } from '../../../../style/Button'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  margin-left: auto;
  margin-right: auto;
  width:85%;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
`
const CardHeaderFlex = styled('div')`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  & > div {
    flex: 1;
  }
`
const WrapProgress = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const WrapButtonRow = styled('div')`
  display: flex;
  & > button,
  & > a {
    flex: inherit;
    width: 100%;
    margin: 0px;
  }
  & > button {
    margin-bottom: 20px;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    & > button {
      flex: 1;
      margin-right: 17px;
      margin-bottom: 0;
    }
    & > a {
      flex: 1;
      margin-left: 17px;
    }
  }
`
const CardBody = styled('div')`
  padding: 25px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 50px 80px 50px 123px;
  }
`
const LinkExternalStyle = styled(LinkExternal)`
  height: 56px;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  justify-content: center;
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 767px) {
    height: 45px;
    font-size: 13px;
  }
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  background: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.buttonView)};
  & svg {
    fill: ${lightColors.fillSvg};
  }
`
const UnlockButtonStyle = styled(UnlockButton)`
  ${ButtonPrimary}
`

const getStatus = (currentBlock: number, startBlock: number, endBlock: number): IfoStatus | null => {
  if (currentBlock < startBlock) {
    return 'coming_soon'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock > endBlock) {
    return 'finished'
  }

  return null
}

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    address,
    name,
    subTitle,
    description,
    launchDate,
    launchTime,
    saleAmount,
    raiseAmount,
    cakeToBurn,
    projectSiteUrl,
    currency,
    currencyAddress,
    tokenDecimals,
    releaseBlockNumber,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 0,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { account } = useWallet()
  const contract = useIfoContract(address)

  const currentBlock = useBlock()
  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [startBlock, endBlock, raisingAmount, totalAmount] = await makeBatchRequest([
        contract.methods.startBlock().call,
        contract.methods.endBlock().call,
        contract.methods.raisingAmount().call,
        contract.methods.totalAmount().call,
      ])

      const startBlockNum = parseInt(startBlock as string, 10)
      const endBlockNum = parseInt(endBlock as string, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const totalBlocks = endBlockNum - startBlockNum
      const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

      setState({
        isLoading: false,
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        raisingAmount: new BigNumber(raisingAmount as string),
        totalAmount: new BigNumber(totalAmount as string),
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
      })
    }

    fetchProgress()
  }, [currentBlock, contract, releaseBlockNumber, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
      <CardBody>
        <CardHeaderFlex>
          <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
          <WrapProgress>
            <IfoCardProgress progress={state.progress} />
            <IfoCardTime
              isLoading={state.isLoading}
              status={state.status}
              secondsUntilStart={state.secondsUntilStart}
              secondsUntilEnd={state.secondsUntilEnd}
              block={isActive || isFinished ? state.endBlockNum : state.startBlockNum}
            />
          </WrapProgress>
        </CardHeaderFlex>
        {(isActive || isFinished) && (
          <IfoCardContribute
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            contract={contract}
            status={state.status}
            raisingAmount={state.raisingAmount}
            tokenDecimals={tokenDecimals}
          />
        )}
        <IfoCardDescription description={description} />
        <IfoCardDetails
          launchDate={launchDate}
          launchTime={launchTime}
          saleAmount={saleAmount}
          raiseAmount={raiseAmount}
          cakeToBurn={cakeToBurn}
          projectSiteUrl={projectSiteUrl}
          raisingAmount={state.raisingAmount}
          totalAmount={state.totalAmount}
        />
        <WrapButtonRow>
          {!account && <UnlockButtonStyle fullWidth />}
          <LinkExternalStyle href={projectSiteUrl}>{TranslateString(412, 'View project site ')}</LinkExternalStyle>
        </WrapButtonRow>
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
