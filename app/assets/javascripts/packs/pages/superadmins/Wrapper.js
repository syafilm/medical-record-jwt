import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import moment from 'moment'
import profile from 'images/profile.jpg'
import {Sidebar, Header} from 'components'
import {Helpers} from 'utils'

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
`

const Box = styled.div`
  width: calc(100% - 240px);
  height: 100%;
  display: flex;
  flex-direction:column;
`

const Wrapper = observer(({
  children,
}) => {
  const store = useStore();
  const { user, handleNotification } = store.user
  const {sidebarMenu} = Helpers
  
  return(
    <Content>
      <Sidebar avatar={profile} menu={sidebarMenu}/>
      <Box>
        <Header/>
        {children}
      </Box>
    </Content>
  )
})

export default Wrapper