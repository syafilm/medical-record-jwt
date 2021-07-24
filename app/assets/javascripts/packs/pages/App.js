import React, { useEffect } from 'react'
import {Routes} from 'pages'
import {observer} from 'mobx-react'
import {useStore} from 'context'
import {token, cookies} from 'configs'
import {ApiUsers} from 'api'
import {toJS} from 'mobx'
import {Jwt} from 'utils'

const App = observer(() => {
  const store = useStore()
  const { user, handleSetUser, handleSetRole } = store.user
  const { activeColor, activeBackground, state, detail, loading,  authenticated } = user
  const userExist = React.useMemo(() => Object.keys(detail).length > 0, [detail])

  const getUserData = async() => {
    try {
      const isTokenNotExpired = token.checkTokenExpire()
      if (isTokenNotExpired) {
        const {role} = Jwt.decode(cookies.getAccessToken())
        if (Object.keys(detail).length === 0 && role !== '') {
          const {data} = await ApiUsers.detail()
          handleSetUser(data)
        }
      } else {
        handleSetUser({})
        cookies.clearCookies();
      }
    } catch (e) {
      handleSetUser({})
      cookies.clearCookies();
    }
  }
  
  React.useEffect(() => {
    getUserData()
  }, [authenticated])
  
  return (<Routes/>)
})

export default App