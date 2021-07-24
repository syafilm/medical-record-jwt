import React from 'react'
import {observer} from 'mobx-react'
import {Redirect, Route} from 'react-router-dom'
import {useStore} from 'context'
import {Helpers} from 'utils'
import {toJS} from 'mobx'
import {token, cookies} from 'configs'
import {Jwt} from 'utils'

const Guest = observer(({component: Component, title, computedMatch, ...rest }) => {
  const { slug } = computedMatch.params === null || computedMatch.params === '' ? '' : computedMatch.params
  const store = useStore()
  const { user, handleSetRole, handleActiveBackgroundColor } = store.user
  const { authenticated, loading, detail } = user
  const {role} = cookies.getAccessToken() ? Jwt.decode(cookies.getAccessToken()) : {role: ''}

  const initializeGuest = (slug) => {
    let data = {}
    if(slug === 'staff'){
      data = {
        background: '#FFE194',
        color: '#b78913'
      }
    }else if(slug === 'superadmin'){
      data = {
        background: '#c3ece5',
        color: '#4b988b'
      }
    }else if(slug === 'client'){
      data = {
        background: '#c9d7f5',
        color: '#5f8eef'
      }
    }

    if(typeof slug !== 'undefined'){
      handleSetRole(slug)
      handleActiveBackgroundColor(data)
    }

  }

  React.useEffect(() => {
    initializeGuest(slug)

    if (title && typeof slug !== 'undefined') return (document.title = `Medical shift project | ${Helpers.capitalizeFirstLetter(slug)} ${title}`)
    document.title = 'Medical shift project'

  }, [title, slug])

  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated && !loading && (Object.keys(detail).length > 0)) {
          if (role === 'staff' || role === 'client' || role === 'superadmin') {
            return <Redirect to={{ pathname: `/${role}` }} />
          }
        }

        if (!authenticated && !loading) {
          return <Component {...props} />
        }
      }}
    />
  )
})

export default Guest
