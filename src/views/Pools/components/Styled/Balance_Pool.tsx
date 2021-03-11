import styled, { css } from 'styled-components'
import Balance from 'components/Balance'
import { lightColors, darkColors } from 'style/Color'

const BalancePool = styled(Balance)<{ isDisabled }>`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  ${(props) =>
    props.isDisabled &&
    css`
      color: ${({ theme }) => (theme.isDark ? darkColors.textDisabled : lightColors.textDisabled)};
    `}
`

export default BalancePool
