import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from '@smartdex/uikit'
import { useToast } from 'state/hooks'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const { connect, reset } = useWallet()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      connect(connectorID)
      activate(connector, async (error: Error) => {
        console.log(error)
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toastError('Provider Error', 'No provider was found')
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = null
            }
            toastError('Authorization Error', 'Please authorize to access your account')
          } else {
            toastError(error.name, error.message)
          }
        }
      })

      const iframe=document.getElementById("iframe-x-exchange")

      if (iframe instanceof HTMLIFrameElement){
        const win = iframe.contentWindow;
        win.postMessage({key: connectorLocalStorageKey, value: "injected"},"*")
      }

    } else {
      toastError("Can't find connector", 'The connector config is wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = ()=>{
    deactivate()
    reset()
    const iframe=document.getElementById("iframe-x-exchange")

    if (iframe instanceof HTMLIFrameElement){
      const win = iframe.contentWindow;
      win.postMessage({action: "remove", key: connectorLocalStorageKey},"*")
    }
  }

  return { login, logout }
}

export default useAuth
