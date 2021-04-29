import React, { useState } from 'react'
import { Button, InjectedModalProps, Skeleton, Text } from 'smartdex-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import nftList from 'config/constants/nfts'
import { useProfile, useToast } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { fetchProfile } from 'state/profile'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useSmartDEXChainRabbits, useProfile as useProfileContract } from 'hooks/useContract'
import { getSmartDEXChainProfileAddress, getSmartDEXChainRabbitsAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'
import SelectionCard from '../SelectionCard'
import ApproveConfirmButtons from '../ApproveConfirmButtons'


const BoxChooseImage = styled.div`
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

type ChangeProfilePicPageProps = InjectedModalProps

const ChangeProfilePicPage: React.FC<ChangeProfilePicPageProps> = ({ onDismiss }) => {
  const [tokenId, setTokenId] = useState(null)
  const TranslateString = useI18n()
  const { isLoading, nfts: nftsInWallet } = useGetWalletNfts()
  const dispatch = useDispatch()
  const { profile } = useProfile()
  const smartDEXChainRabbitsContract = useSmartDEXChainRabbits()
  const profileContract = useProfileContract()
  const { account } = useWallet()
  const { toastSuccess } = useToast()
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onApprove: () => {
      return smartDEXChainRabbitsContract.methods.approve(getSmartDEXChainProfileAddress(), tokenId).send({ from: account })
    },
    onConfirm: () => {
      if (!profile.isActive) {
        return profileContract.methods.reactivateProfile(getSmartDEXChainRabbitsAddress(), tokenId).send({ from: account })
      }

      return profileContract.methods.updateProfile(getSmartDEXChainRabbitsAddress(), tokenId).send({ from: account })
    },
    onSuccess: async () => {
      // Re-fetch profile
      await dispatch(fetchProfile(account))
      toastSuccess(`${TranslateString(3030,"Profile Updated!")}`)
      onDismiss()
    },
  })
  const bunnyIds = Object.keys(nftsInWallet).map((nftWalletItem) => Number(nftWalletItem))
  const walletNfts = nftList.filter((nft) => bunnyIds.includes(nft.bunnyId))

  return (
    <>
      <TextChoosePic as="p" color="textSubtle" mb="24px">
        {TranslateString(3012, 'Choose a new Collectible to use as your profile pic.')}
      </TextChoosePic>
      {isLoading ? (
        <Skeleton height="80px" mb="16px" />
      ) : (
        walletNfts.map((walletNft) => {
          const [firstTokenId] = nftsInWallet[walletNft.bunnyId].tokenIds

          return (
            <BoxChooseImage>
                <SelectionCard
                  name="profilePicture"
                  key={walletNft.bunnyId}
                  value={firstTokenId}
                  image={`/images/nfts/${walletNft.images.md}`}
                  isChecked={firstTokenId === tokenId}
                  onChange={(value: string) => setTokenId(parseInt(value, 10))}
                  disabled={isApproving || isConfirming || isConfirmed}
                >
                  <Text bold>{walletNft.name}</Text>
                </SelectionCard>

            </BoxChooseImage>
          )
        })
      )}
      {!isLoading && walletNfts.length === 0 && (
        <>
          <NoteText as="p" color="textSubtle" mb="16px">
            {TranslateString(3013, 'Sorry! You don’t have any eligible Collectibles in your wallet to use!')}
          </NoteText>
          <NoteText as="p" color="textSubtle" mb="24px">
            {TranslateString(3014, 'Make sure you have a SmartDEX Collectible in your wallet and try again!')}
          </NoteText>
        </>
      )}
      <ApproveConfirmButtons
        isApproveDisabled={isConfirmed || isConfirming || isApproved || tokenId === null}
        isApproving={isApproving}
        isConfirmDisabled={!isApproved || isConfirmed || tokenId === null}
        isConfirming={isConfirming}
        onApprove={handleApprove}
        onConfirm={handleConfirm}
      />
     
    </>
  )
}
const TextChoosePic = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};

`
const NoteText = styled(Text)`
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
`

export default ChangeProfilePicPage
