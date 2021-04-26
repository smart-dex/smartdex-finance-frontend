import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Card, CardBody, Heading, Skeleton, Text } from 'uikit-sotatek'
import { Link as RouterLink } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import nftList from 'config/constants/nfts'
import useI18n from 'hooks/useI18n'
import { useToast } from 'state/hooks'
import { getSmartDEXChainProfileAddress } from 'utils/addressHelpers'
import { useSmartDEXChainRabbits } from 'hooks/useContract'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'


const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primary};
`

const NftWrapper = styled.div`
  margin-bottom: 24px;
`
const TextStepTwo = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;
 `
const HeadingText = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`
const CardBoxCon = styled(CardBody)`
  margin-top: 21px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.white)};
`
const HeadingChoose = styled(Heading)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const TextSubTwo = styled(Text)`
  font-size: 13px;
  line-height: 25px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  font-weight: 400;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 29%;
    font-size:14px
  }
`
const LinkSub = styled(Link)`
  color: ${baseColors.primary};
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
  
`
const TextTitleTwo = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
   font-size: 16px;
  }
`
const BoxSelect = styled.div`
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
const HeadingAllow = styled(Heading)`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
   }
`
const TextAllow = styled(Text)`
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
   }
  
`
const BtnApprove = styled(Button)`
  background-color: ${lightColors.primary} !important;
  box-shadow: none;
  color: ${brandColors.white} !important;
  padding: 0 35px;
  font-size: 13px;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
   }
 `
const StepButton = styled(NextStepButton)`
  position: relative;
  background-color: ${baseColors.primary};
  color: ${lightColors.white};
  box-shadow: none;
  margin-top: 30px;
  padding: 0 30px 0 22px;
  font-size: 13px;
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
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const CardBody2 = styled(CardBody)`
  padding: 0px;
`
const BoxIconDirect = styled.div`
  position: absolute;
  right: 13px;
  top: 9px;
  justify-content: flex-end;
  line-height: 45px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.white)};
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 36px;
    line-height: 56px;
    top: 1px;
    right: 2px;
  }
`

const HeadingOops = styled(Heading)`
  color: ${baseColors.primary};
`

const ProfilePicture: React.FC = () => {
  const [isApproved, setIsApproved] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const { tokenId, actions } = useContext(ProfileCreationContext)
  const TranslateString = useI18n()
  const { isLoading, nfts: nftsInWallet } = useGetWalletNfts()
  const smartDEXChainRabbitsContract = useSmartDEXChainRabbits()
  const { account } = useWallet()
  const { toastError } = useToast()
  const bunnyIds = Object.keys(nftsInWallet).map((nftWalletItem) => Number(nftWalletItem))
  const walletNfts = nftList.filter((nft) => bunnyIds.includes(nft.bunnyId))

  const handleApprove = () => {
    smartDEXChainRabbitsContract.methods
      .approve(getSmartDEXChainProfileAddress(), tokenId)
      .send({ from: account })
      .on('sending', () => {
        setIsApproving(true)
      })
      .on('receipt', () => {
        setIsApproving(false)
        setIsApproved(true)
      })
      .on('error', (error) => {

        toastError(`${TranslateString(3044,'An error occurred approving transaction')}`)
        setIsApproving(false)
      })
  }

  if (!isLoading && walletNfts.length === 0) {
    return (
      <>
        <HeadingOops size="xl" mb="24px">
          {TranslateString(852, 'Oops!')}
        </HeadingOops>
        <Text bold fontSize="20px" mb="24px">
          {TranslateString(854, 'We couldn’t find any SmartDEX Collectibles in your wallet.')}
        </Text>
        <Text as="p">
          {TranslateString(
            3040,
            'You need a SmartDEX Collectible to finish setting up your profile. If you sold or transferred your starter collectible to another wallet, you’ll need to get it back or acquire a new one somehow. You can’t make a new starter with this wallet address.',
          )}
        </Text>
      </>
    )
  }

  return (
    <>
      <TextStepTwo fontSize="20px" color="textSubtle" bold>
      {`${TranslateString(12209, "Step")} ${2}`}
      </TextStepTwo>
      <HeadingText as="h3" size="xl" mb="24px">
        {TranslateString(778, 'Set Profile Picture')}
      </HeadingText>
      <CardBoxCon mb="">
        <CardBody2>
          <HeadingChoose as="h4" size="lg" mb="8px">
            {TranslateString(812, 'Choose collectible')}
          </HeadingChoose>
          <TextSubTwo as="p" color="textSubtle">
            {TranslateString(
              814,
              'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis',
            )}
            <LinkSub to="/collectibles" style={{ marginLeft: '4px' }}>
              {TranslateString(3005, 'See the list')}
            </LinkSub>
          </TextSubTwo>
          <NftWrapper>
            {isLoading ? (
              <Skeleton height="80px" mb="16px" />
            ) : (
              walletNfts.map((walletNft) => {
                const [firstTokenId] = nftsInWallet[walletNft.bunnyId].tokenIds

                return (
                  <BoxSelect>
                      <SelectionCard
                        name="profilePicture"
                        key={walletNft.bunnyId}
                        value={firstTokenId}
                        image={`/images/nfts/${walletNft.images.md}`}
                        isChecked={firstTokenId === tokenId}
                        onChange={(value: string) => actions.setTokenId(parseInt(value, 10))}
                      >
                        <TextTitleTwo bold>{walletNft.name}</TextTitleTwo>
                      </SelectionCard>
                  </BoxSelect>
                )
              })
            )}
          </NftWrapper>
          <HeadingAllow as="h4" size="lg" mb="8px">
            {TranslateString(818, 'Allow collectible to be locked')}
          </HeadingAllow>
          <TextAllow as="p" color="textSubtle" mb="16px">
            {TranslateString(
              820,
              "The collectible you've chosen will be locked in a smart contract while it’s being used as your profile picture. Don't worry - you'll be able to get it back at any time.",
            )}
          </TextAllow>
           <BtnApprove
                isLoading={isApproving}
                disabled={isApproved || isApproving || tokenId === null}
                onClick={handleApprove}
                endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : undefined}
              >
                {TranslateString(564, 'Approve')}
          </BtnApprove>
          
        </CardBody2>
      </CardBoxCon>
        <StepButton onClick={actions.nextStep} disabled={tokenId === null || !isApproved || isApproving}>
          {TranslateString(798, 'Next Step >')}
          <BoxIconDirect>
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L0.999999 1" strokeWidth="2"/>
            </svg>
          </BoxIconDirect>
        </StepButton>
      
     
    </>
  )
}

export default ProfilePicture
