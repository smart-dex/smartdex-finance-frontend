import { baseColors } from './Color'

export const Button = `
  color: #fff;
  height: 56px;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  justify-content: center;
  &:hover {
    text-decoration: none;
  }
  @media(max-width: 767px) {
    height: 45px;
    font-size: 13px;
  }
`
export const ButtonPrimary = `
  ${Button}
  box-shadow: 0px 4px 10px rgba(64, 170, 255, 0.24);
  background-color: ${baseColors.primary};
`
export const ButtonSecondary = `
  ${Button}
  box-shadow: 0px 4px 10px rgba(255, 161, 78, 0.24);
  background-color: #FFA14E;
`
export const ButtonBorder = `
  ${Button}
  background-color: #fff;
  color: ${baseColors.primary};
  border: 1px solid ${baseColors.primary};
  &:hover {
    background: ${baseColors.primary} !important;
    border-color: ${baseColors.primary} !important;
    text-decoration: none;
    color: #fff;
  }
`
export const ButtonGrey = `
  ${Button}
  color: #8F8FA0;
  background: #E8E8EB;
  & svg {
    fill: #8F8FA0;
  }
`

export default Button
