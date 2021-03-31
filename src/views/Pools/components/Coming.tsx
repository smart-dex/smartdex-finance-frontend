import React from 'react'
import styled, { css } from 'styled-components'
import { Image, Button, Flex } from 'uikit-sotatek'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from 'style/Color'
import CardTitle from './CardTitle'
import CardContent from './CardContent'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
margin-top: 10px;
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
`


const StyledCardName = styled.div`

`
const NamePool = styled(Flex)`
  order: 1;
  height: 60px;
  align-self: flex-start;
`
const StyledTriangle = styled.div<{ isFinished?: boolean }>`
    width: 0;
    height: 0;
    border-bottom: 60px solid ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
    ${(props) =>
    props.isFinished &&
    css`
      border-bottom: 60px solid #17C267;
    `}
    border-right: 30px solid transparent;
    position: absolute;
    left: 100%;
    right: auto;
    display: block;
    height: 100%;
    top: -1px;
    &:before {
      content: "";
      content: "";
    width: 1px;
    display: block;
    background:  ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
    height:59px;
    transform: skewX(
    27deg
    );
    position: absolute;
    left: 15px;
    top: 0px;
    }
`
const StyleNamePool = styled.div`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  white-space: nowrap; 
  text-overflow: ellipsis;
  overflow: hidden; 
  padding:24px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-weight: bold;
  line-height: 29px;
  font-size: 18px;
  align-self: flex-start; 
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
  &:hover{
    >div{
      visibility: visible;
    }
  }
 
`
const StyledTag = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  background-color:  ${({ theme }) => (theme.isDark ? '#151C31' : 'transparent')};  
  width: 200px;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
`


const CardContentComing = styled(CardContent)`
  height:100%;
  border-left: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-right: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 25px 14px 102px ${({ theme }) => (theme.isDark ? darkColors.cardShadow : lightColors.cardShadow)};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-wrap: nowrap;
  }
`
const CardComing = styled.div`
  margin:auto;
   background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
   border-bottom: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
   max-width: 350px;
   min-width: 300px;
   ${({ theme }) => theme.mediaQueries.nav} {
     max-width: 400px;
   }}
`
const StyleFlexDetail = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.detailPool : lightColors.detailPool)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`
const StyledButton = styled.div`
   >a{
    background: ${baseColors.primary};
    box-shadow: 0px 4px 10px rgba(83, 185, 234, 0.24);
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    max-width:143px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
    }
   }
   margin-bottom:10px;
   
`

const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <CardComing>
      <StyledCardName>
        <NamePool>
          <CardTitle>
            <StyleNamePool> {TranslateString(999, 'Your Project')}
            </StyleNamePool>
            <StyledTriangle />
          </CardTitle>
          <StyledTag />
        </NamePool>
      </StyledCardName>
      <CardContentComing>
        <Image src="/images/bunny-question.svg" width={64} height={64} alt="Your project here" />
        <Balance>???</Balance>
        <CommunityTag />
        <Label>{TranslateString(416, 'Create a pool for your token')}</Label>
        <StyledButton>
          <Button
            target="_blank"
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLScGdT5rrVMr4WOWr08pvcroSeuIOtEJf1sVdQGVdcAOqryigQ/viewform"
          >
            {TranslateString(418, 'Apply Now')}
          </Button>
        </StyledButton>

        <DetailPlaceholder>
          <StyleFlexDetail>{TranslateString(736, 'APR')}:</StyleFlexDetail>
          <StyleFlexDetail style={{ marginLeft: '5px' }}>??</StyleFlexDetail>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <StyleFlexDetail>
            {TranslateString(384, 'Your Stake')}:
           </StyleFlexDetail>
          <StyleFlexDetail style={{ marginLeft: '5px' }}>???</StyleFlexDetail>
        </DetailPlaceholder>

      </CardContentComing>
    </CardComing>
  )
}

export default Coming
