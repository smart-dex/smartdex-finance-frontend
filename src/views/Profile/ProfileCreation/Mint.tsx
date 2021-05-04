import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Text } from 'smartdex-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useSdc, useBunnyFactory } from 'hooks/useContract'
import useHasSdcBalance from 'hooks/useHasSdcBalance'
import nftList from 'config/constants/nfts'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import ApproveConfirmButtons from '../components/ApproveConfirmButtons'
import useProfileCreation from './contexts/hook'
import { MINT_COST, STARTER_BUNNY_IDS } from './config'



const TextOne = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;

`
const HeadingStep = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`
const TextSub = styled(Text)`
  font-size: 13px;
  line-height: 20px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 40%;
    font-size: 14px;
  }
`
const CardBox = styled(Card)`
  margin-top: 21px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.white)};
  
`
const HeadingBox = styled(Heading)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const Textsubtitle = styled(Text)`
  font-size: 13px;
  line-height: 30px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const SelectionBox = styled.div`
    box-shadow: none !important;
    position: relative;
    & : checked {
    background-color: ${baseColors.bgrChecked}!important;
    }
    & : hover{
    box-shadow: none !important;
    }
    & :focus{
    box-shadow: none !important;
    }
    & < div : active{
    box-shadow: none !important;
    border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
    }
    & :after {
      height: 16px !important;
      width: 16px !important;
    }
`
const SelectText = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const ApproveButtons = styled.div`
div {
  box-shadow: none !important;
  color: ${brandColors.white} !imporatant;
  justify-content: flex-start !important;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
}
`
const NextStepOne = styled(NextStepButton)`
  position: relative;
  background-color: ${baseColors.primary};
  color: ${lightColors.white};
  box-shadow: none;
  margin-top: 30px;
  padding: 0 30px 0 22px;
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
  & svg {
    stroke: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.white)};
    }
    &:disabled{
      background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
      color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
      & svg {
          stroke: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
      }
}
`
const TextCount = styled(Text)`
  font-size: 13px;
  line-height: 30px;
  display: flex;
  color: ${baseColors.colorRed};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const CardBody2 = styled(CardBody)`
  padding: 0px;
`
const BoxIconDirect = styled.div`
  position: absolute;
  right: 12px;
  top: 6px;
  justify-content: flex-end;
  line-height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 36px;
    line-height: 56px;
    top: 1px;
    right: 2px;
  }
`
const nfts = nftList.filter((nft) => STARTER_BUNNY_IDS.includes(nft.bunnyId))
const minimumSdcBalanceToMint = new BigNumber(MINT_COST).multipliedBy(new BigNumber(10).pow(18))

const Mint: React.FC = () => {
  const [bunnyId, setBunnyId] = useState(null)
  const { actions, minimumSdcRequired, allowance } = useProfileCreation()

  const { account } = useWallet()
  const sdcContract = useSdc()
  const bunnyFactoryContract = useBunnyFactory()
  const TranslateString = useI18n()
  const hasMinimumSdcRequired = useHasSdcBalance(minimumSdcBalanceToMint)
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await sdcContract.methods.allowance(account, bunnyFactoryContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumSdcRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return sdcContract.methods
        .approve(bunnyFactoryContract.options.address, allowance.toJSON())
        .send({ from: account })
    },
    onConfirm: () => {
      return bunnyFactoryContract.methods.mintNFT(bunnyId).send({ from: account })
    },
    onSuccess: () => null,
  })

  return (
    <>
      <TextOne fontSize="20px" color="textSubtle" bold>
      {`${TranslateString(12209, "Step")} ${1}`}
      </TextOne>
      <HeadingStep as="h3" size="xl" mb="24px">
        {TranslateString(776, 'Get Starter Collectible')}
      </HeadingStep>
      <TextSub as="p">
        {TranslateString(999, 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia  consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.')}
      </TextSub>
      <CardBox mb="24px">
        <CardBody>
          <HeadingBox as="h4" size="lg" mb="8px">
            {TranslateString(792, 'Choose your Starter!')}
          </HeadingBox>
          <Textsubtitle as="p" color="textSubtle">
            {TranslateString(999, 'Choose wisely: you can only ever make one starter collectible!')}
          </Textsubtitle>
          <Textsubtitle as="p" mb="24px" color="textSubtle">
            {`${TranslateString(3026, "Cost:")} ${MINT_COST} ${TranslateString(999,"SDC")}`}
            
          </Textsubtitle>
          {nfts.map((nft) => {
            const handleChange = (value: string) => setBunnyId(parseInt(value, 10))

            return (
              <SelectionBox>
                <SelectionCard
                  key={nft.bunnyId}
                  name="mintStarter"
                  value={nft.bunnyId}
                  image={`/images/nfts/${nft.images.md}`}
                  isChecked={bunnyId === nft.bunnyId}
                  onChange={handleChange}
                  disabled={isApproving || isConfirming || isConfirmed || !hasMinimumSdcRequired}
                >
                  <SelectText bold>{nft.name}</SelectText>
                </SelectionCard>
              </SelectionBox>
            )
          })}
          {!hasMinimumSdcRequired && (
            <TextCount color="failure" mb="16px">
             {`${TranslateString(3021, "A minimum of")} ${MINT_COST} ${TranslateString(3022,"SDC is required")}`} 
            </TextCount>
          )}
          <ApproveButtons>
            <ApproveConfirmButtons
              isApproveDisabled={bunnyId === null || isConfirmed || isConfirming || isApproved}
              isApproving={isApproving}
              isConfirmDisabled={!isApproved || isConfirmed || !hasMinimumSdcRequired}
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
            />
          </ApproveButtons>

        </CardBody>
      </CardBox>
      <NextStepOne onClick={actions.nextStep} disabled={!isConfirmed}>
        {TranslateString(798, 'Next Step >')}
        <BoxIconDirect>
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L0.999999 1" strokeWidth="2"/>
            </svg>
          </BoxIconDirect>
      </NextStepOne>
    </>
  )
}

export default Mint
