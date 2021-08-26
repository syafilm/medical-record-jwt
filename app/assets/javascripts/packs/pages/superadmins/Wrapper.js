import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import moment from 'moment'
import profile from 'images/profile.jpg'
import {Sidebar, Header} from 'components'
import {toJS} from 'mobx'
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
  left: 240px;
  position: relative;
`

const Wrapper = observer(({
  children,
}) => {
  const store = useStore();
  const { user, handleNotification } = store.user
  const {sidebarMenu} = Helpers
  
  // console.log(toJS(user), 'hello')

  return(
    <Content>
      <Sidebar
        avatar={profile} 
        menu={sidebarMenu}/>
      <Box>
        <Header avatar={profile} email={user?.detail?.email} />
        {children}
      </Box>
    </Content>
  )
})

export default Wrapper