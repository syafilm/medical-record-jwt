import React from 'react'
import {observer} from 'mobx-react'
import {Redirect, Route} from 'react-router-dom'
import {useStore} from 'context'
import {Helpers} from 'utils'
import {toJS} from 'mobx'
import {token, cookies} from 'configs'
import {Jwt} from 'utils'

const Superadmin = ({ component: Component, title, computedMatch, ...rest }) => {
  const { slug } = computedMatch.params === null || computedMatch.params === '' ? '' : computedMatch.params
  const store = useStore()
  const { user, handleSetRole, handleActiveBackgroundColor } = store.user
  const { authenticated = true, loading, detail } = user
  const {role} = cookies.getAccessToken() ? Jwt.decode(cookies.getAccessToken()) : {role: ''}
  const {color, background} = cookies.getAccessToken() ? Jwt.decode(cookies.getAccessToken()) : {color: '', background: ''}

  const initializeData = (role, obj) => {
    const data = {background: obj.background, color: obj.color}
    handleSetRole(role)
    handleActiveBackgroundColor(data)
  }

  React.useEffect(() => {
    initializeData(role, {color, background})

    if (title && role !== '') return (document.title = `Medical shift project | ${Helpers.capitalizeFirstLetter(role)} ${title}`)
    document.title = 'Medical shift project'

  }, [title, role])

  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated && !loading && (Object.keys(detail).length > 0)) {
          if (role !== 'superadmin') return <Redirect to={{ pathname: '/' }} />
          return <Component {...props} />
        }

        if (!authenticated && !loading) {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
      }}
    />
  )
}

export default Superadmin
