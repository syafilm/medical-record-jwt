import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import moment from 'moment'
import profile from 'images/profile.jpg'
import {Sidebar, Header} from 'components'
import {Helpers} from 'utils'
import Wrapper from './Wrapper'

const Index = observer(() => {
  const store = useStore();
  const { user, handleNotification } = store.user
  const {sidebarMenu} = Helpers

  return(
    <Wrapper>
      Index
    </Wrapper>
  )
})

export default Index