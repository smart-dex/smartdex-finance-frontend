import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  Card,
  CardBody,
  Heading,
  Text,
  Input as UIKitInput,
  Button,
  AutoRenewIcon,
  CheckmarkIcon,
  Flex,
  WarningIcon,
  useModal,
  Skeleton,
  Checkbox,
} from 'uikit-sotatek'
import { parseISO, formatDistance } from 'date-fns'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useToast } from 'state/hooks'
import useWeb3 from 'hooks/useWeb3'
import useI18n from 'hooks/useI18n'
import useHasSdcBalance from 'hooks/useHasSdcBalance'
import debounce from 'lodash/debounce'
import { lightColors, darkColors, baseColors } from 'style/Color'
import ConfirmProfileCreationModal from '../components/ConfirmProfileCreationModal'
import useProfileCreation from './contexts/hook'
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, REGISTER_COST } from './config'


enum ExistingUserState {
  IDLE = 'idle', // initial state
  CREATED = 'created', // username has already been created
  NEW = 'new', // username has not been created
}

const profileApiUrl = process.env.REACT_APP_API_PROFILE
const minimumSdcToRegister = new BigNumber(REGISTER_COST).multipliedBy(new BigNumber(10).pow(18))

const InputWrap = styled.div`
  position: relative;
  max-width: 240px;
  & : focus{
    box-shadow: none !important;
  }
  & svg {
    fill: ${lightColors.primary} !important;
  }
  input{
    letter-spacing: -0.03em;
    font-size: 14px;
    line-height: 143%;
    font-weight: 500;
    ::placeholder {
      color: ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorInput)} !important;
      }
    ${({ theme }) => theme.mediaQueries.nav} {
        font-size: 16px;
    }
`

const Input = styled(UIKitInput)`
  padding-right: 40px;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: -0.03em;
  height: 56px;
  border-radius: 50px;
  box-shadow: none !important;
  color: ${({ theme }) => (theme.isDark ? darkColors.white : lightColors.textSubtle)} !important;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.darkBorder : lightColors.lightBorder)};
  background-color: ${({ theme }) => (theme.isDark ? darkColors.daskCheckBox : lightColors.white)} !important;
  &:focus:not(:disabled) {
    box-shadow: none;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const Indicator = styled(Flex)`
  align-items: center;
  height: 24px;
  justify-content: center;
  margin-top: -12px;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 24px;
`
const PanText4 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;
  margin-bottom: 7px;
`
const HeadingName = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
  margin-bottom: 9px !important;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`
const TextName = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`
const CardName = styled(CardBody)`
  margin-top: 21px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.white)};
`
const HeadingSetName = styled(Heading)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`
const CardBodyName = styled(CardBody)`
  padding: 0px;
`
const NameSub = styled(Text)`
  font-size: 13px;
  line-height: 25px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  font-weight: 400;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`

const NoteText = styled(Text)`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
`

const TextSubTitle = styled(Text)`  
  color: ${baseColors.colorRed};
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const TextCheckbox = styled(Text)`
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 14px;
    }
`
const StyleCheck = styled.div`
  box-shadow: none !important;
  position: relative;
  & : checked {
  background-color: ${baseColors.primary}!important;
  }
  & : hover{
  box-shadow: none !important;
  }
  & : active{
  box-shadow: none !important;
  }
  & : focus{
    box-shadow: none !important;
  }
`
const StyleCheckbox = styled(Checkbox)`
  background-color: ${({ theme }) => (theme.isDark ? darkColors.daskCheckBox : lightColors.lightCheckBox)} !important;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.darkBorder : lightColors.lightBorder)};
  border-radius: 4px;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
    opacity: 1;
  }
`
const BtnConfirm = styled(Button)`
    background: ${lightColors.primary};
    box-shadow: 0px 4px 10px rgba(0, 133, 255, 0.24);
    border-radius: 10px;
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
const ButtonComplete = styled(Button)`
  background: ${baseColors.primary};
  box-shadow: none;
  font-size: 13px;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`


const UserName: React.FC = () => {
  const [isAcknowledged, setIsAcknoledged] = useState(false)
  const { teamId, tokenId, userName, actions, minimumSdcRequired, allowance } = useProfileCreation()
  const TranslateString = useI18n()
  const { account, ethereum } = useWallet()
  const { toastError } = useToast()
  const web3 = useWeb3()
  const [existingUserState, setExistingUserState] = useState<ExistingUserState>(ExistingUserState.IDLE)
  const [isValid, setIsValid] = useState(false)
  const [isExist, setIsExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const hasMinimumSdcRequired = useHasSdcBalance(minimumSdcToRegister)
  const [onPresentConfirmProfileCreation] = useModal(
    <ConfirmProfileCreationModal
      userName={userName}
      tokenId={tokenId}
      account={account}
      teamId={teamId}
      minimumSdcRequired={minimumSdcRequired}
      allowance={allowance}
    />,
    false,
  )
  const isUserCreated = existingUserState === ExistingUserState.CREATED

  const checkUsernameExist = debounce(async (value: string) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${profileApiUrl}/api/users/${value}`)
      const data = await res.json()
      if (!data.status) {
        setIsExist(true)
        setMessage('')
      } else {
        setIsExist(false)
        setMessage('User name exist')
      }
    } finally {
      setIsLoading(false)
    }
  }, 200)

  const checkUsernameValid = (value) => {
    const regex = /^(?=.{3,15}$)[a-zA-Z0-9]+$/
    const checkValid = regex.test(value)

    if (checkValid) {
      setIsValid(true)
      setMessage('')
    } else {
      setIsValid(false)
      setMessage(`${TranslateString(3036,'Username include 3 - 15 characters word and number, not include special characters')}`)
     
    }
  }

  const handleChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    actions.setUserName(value)
    checkUsernameValid(value)
  }

  const handleConfirm = async () => {
    try {
      setIsLoading(true)

      const provider = ethereum as any
      const signature = provider?.bnbSign
        ? (await provider.bnbSign(account, userName))?.signature
        : await web3.eth.personal.sign(userName, account, null) // Last param is the password, and is null to request a signature in the wallet

      const response = await fetch(`${profileApiUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account,
          username: userName,
          signature,
        }),
      })
      const data = await response.json()
      if (!data.errors) {
        setExistingUserState(ExistingUserState.CREATED)
      } else {
        toastError(`${TranslateString(3039,'Username is already been used.')}`)
      }
    } catch (error) {
      toastError(`${TranslateString(3035, 'MetaMask Message Signature: User denied message signature.')}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcknoledge = () => setIsAcknoledged(!isAcknowledged)

  // Perform an initial check to see if the wallet has already created a username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${profileApiUrl}/api/users/${account}`)
        const data = await response.json()

        if (data.status) {
          // const dateCreated = formatDistance(parseISO(data.created_at), new Date())
          // setMessage(`Created ${dateCreated} ago`)
          actions.setUserName(data.data.username)
          setExistingUserState(ExistingUserState.CREATED)
          setIsValid(true)
        } else {
          setExistingUserState(ExistingUserState.NEW)
        }
      } catch (error) {
        toastError('Error: Unable to verify username')
      }
    }

    if (account) {
      fetchUser()
    }
  }, [account, setExistingUserState, setIsValid, setMessage, actions, toastError])

  return (
    <>
      <PanText4 fontSize="20px" color="textSubtle" bold>
      {`${TranslateString(12209, "Step")} ${4}`}
      </PanText4>
      <HeadingName as="h3" size="xl" mb="24px">
        {TranslateString(1110, 'Set Your Name')}
      </HeadingName>
      <TextName as="p" mb="24px">
        {TranslateString(
          999,
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor ',
        )}
      </TextName>
      <CardName mb="24px">
        <CardBodyName>
          <HeadingSetName as="h4" size="lg" mb="8px">
            {TranslateString(1110, 'Set Your Name')}
          </HeadingSetName>
          <NameSub as="p" color="textSubtle" mb="24px">
            {TranslateString(
              840,
              'Amet minim mollit non deserunt ullamco est sit aliqua dolor ',
            )}
          </NameSub>
          {existingUserState === ExistingUserState.IDLE ? (
            <Skeleton height="40px" width="240px" />
          ) : (
            <InputWrap>
              <Input
                onChange={handleChange}
                isWarning={userName && !isValid}
                isSuccess={userName && isValid}
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
                disabled={isUserCreated}
                placeholder={TranslateString(1094, 'User Name')}
                value={userName}
              />
              <Indicator>
                {isLoading && <AutoRenewIcon spin />}
                {!isLoading && isValid && userName && <CheckmarkIcon color="success" />}
                {!isLoading && !isValid && userName && <WarningIcon color="failure" />}
              </Indicator>
            </InputWrap>
          )}
          <NoteText color="textSubtle" fontSize="14px" py="4px" mb="16px" style={{ minHeight: '30px' }}>
            {TranslateString(3008, "Minimum length: 3 characters")}
          </NoteText>
          <TextSubTitle as="p" color="failure" mb="8px">
            {
              userName &&message && message
            }
          </TextSubTitle>
          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <StyleCheck>
                <StyleCheckbox
                  id="checkbox"
                  disabled={!isValid || isUserCreated || isLoading}
                  scale="sm"
                  checked={isAcknowledged && isValid}
                  onChange={handleAcknoledge} />
              </StyleCheck>
              <TextCheckbox ml="8px">
                {TranslateString(1096, 'I understand that people can view my wallet if they know my username')}
              </TextCheckbox>
            </Flex>
          </label>
          <BtnConfirm onClick={handleConfirm} disabled={!isValid || isUserCreated || isLoading || !isAcknowledged}>
            {TranslateString(464, 'Confirm')}
          </BtnConfirm>
        </CardBodyName>
      </CardName>
      <ButtonComplete onClick={onPresentConfirmProfileCreation} disabled={!isValid || !isUserCreated}>
        {TranslateString(842, 'Complete Profile')}
      </ButtonComplete>
      {!hasMinimumSdcRequired && (
        <Text color="failure" mt="16px">
          {TranslateString(1098, `A minimum of ${REGISTER_COST} SDC is required`, { num: REGISTER_COST })}
        </Text>
      )}
    </>
  )
}

export default UserName
