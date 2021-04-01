import React from 'react'
import { Button, Flex, Heading, useModal, Won } from 'uikit-sotatek'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import ClaimNftAndSdcModal, { useCanClaim } from './ClaimGiftModal'
import HeaderWrapper from './HeaderWrapper'
import EditProfileModal from './EditProfileModal'

const ProfileHeader = () => {
  const TranslateString = useI18n()
  const { canClaim, checkClaimStatus } = useCanClaim()
  const [onPresentClaimGiftModal] = useModal(<ClaimNftAndSdcModal onSuccess={checkClaimStatus} />)
  const [onEditProfileModal] = useModal(<EditProfileModal />, false)
  const { hasProfile } = useProfile()

  return (
    <div>
      <HeaderWrapper>
        <StyledHeader>
          <StyledText>
            <TextHeading>{TranslateString(999, 'Your Profile')}</TextHeading>
            <TextDescription>{TranslateString(999, 'Check your stats and collect achievements')}</TextDescription>
            {hasProfile && (
              <ButtonEditProfile onClick={onEditProfileModal}>{TranslateString(999, 'Edit Profile')}</ButtonEditProfile>
            )}
          </StyledText>
          {canClaim && (
            <Button variant="tertiary" onClick={onPresentClaimGiftModal} startIcon={<Won />}>
              {TranslateString(999, "You've got a gift to claim!")}
            </Button>
          )}
        </StyledHeader>
      </HeaderWrapper>
      <Line />
    </div>
  )
}

const Line = styled.div`
  margin-top: 20px;
  border: 1px dashed ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  margin-bottom: 29px;
`
const StyledHeader = styled(Flex)`
  flex-direction: column;
`

const StyledText = styled(Flex)`
  flex-direction: column;
  align-items: center;
`
const TextHeading = styled(Heading)`
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
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
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 150px;
    height: 56px;
  }
`

export default ProfileHeader
