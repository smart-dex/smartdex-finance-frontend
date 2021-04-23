import React from 'react'
import { Button, Flex, Heading, useModal, Won, Text } from 'uikit-sotatek'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { darkColors, lightColors, baseColors } from 'style/Color'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ClaimNftAndSdcModal, { useCanClaim } from './ClaimGiftModal'
import HeaderWrapper from './HeaderWrapper'
import EditProfileModal from './EditProfileModal'


const ProfileHeader = () => {
  const TranslateString = useI18n()
  const { canClaim, checkClaimStatus } = useCanClaim()
  const [onPresentClaimGiftModal] = useModal(<ClaimNftAndSdcModal onSuccess={checkClaimStatus} />)
  const [onEditProfileModal] = useModal(<EditProfileModal />, false)
  const { hasProfile } = useProfile()
  const { account } = useWallet()
  
  
  return (
    <div>
      <HeaderWrapper>
        <StyledHeader>
          <StyledText>
            <TextHeading>{TranslateString(3001, 'Your Profile')}</TextHeading>
            <TextDescription>{TranslateString(3002, 'Check your stats and collect achievements')}</TextDescription>
            {account && hasProfile && (
              <ButtonEditProfile onClick={onEditProfileModal}>{TranslateString(999, 'Edit Profile')}</ButtonEditProfile>
            )}
          </StyledText>
          {canClaim && (
            <BoxGift>
                <ButtonGift variant="tertiary" onClick={onPresentClaimGiftModal} startIcon={<Won />}>
                  {TranslateString(999, "You've got a gift to claim!")}
                </ButtonGift>
            </BoxGift>
          )}
        </StyledHeader>
      </HeaderWrapper>
      <Line />
    </div>
  )
}
const TextStyle = styled(Text)`
  padding-top: 0px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.nav} {
    padding-top: 8px;
    font-size: 18px;
  }
`
const Line = styled.div`
  margin-top: 5px;
  border: 1px dashed ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
    margin-bottom: 40px;
  }
`
const StyledHeader = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  display: grid;
`

const StyledText = styled(Flex)`
  flex-direction: column;
  align-items: center;
`
const TextHeading = styled(Heading)`
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  margin-bottom: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const TextDescription = styled(Heading)`
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`

const ButtonEditProfile = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 150px;
  height: 56px;
  background-color: ${lightColors.primary};
  box-shadow: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 150px;
    height: 56px;
  }
`
const BoxGift = styled.div`
  align-item: center;
  display: flex;
`
const ButtonGift = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? darkColors.colorGift : lightColors.colorGift)};
  color: ${baseColors.colorRed};
  
`

export default ProfileHeader
