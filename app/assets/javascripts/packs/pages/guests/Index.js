import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {useStore} from 'context';
import {Container} from 'components'
import { observer } from "mobx-react";

const userRoles = [
  {
    id: 0,
    url: '',
    slug: 'superadmin',
    title: 'Superadmin',
    description: 'Admin can manage staff and interact with client directly',
    background: '#c3ece5',
    color: '#4b988b'
  },
  {
    id: 1,
    url: '',
    slug: 'staff',
    title: 'Staff',
    description: 'Staff can see how long them work for specific client',
    background: '#FFE194',
    color: '#b78913'
  },
  {
    id: 2,
    url: '',
    slug: 'client',
    title: 'Client',
    description: 'Client can see staff progress and manage about their work',
    background: '#c9d7f5',
    color: '#5f8eef'
  }
]

const Wrapper = styled.div`
  position: relative;
`

const Card = styled.div`
  display: flex;
  padding: 20px 10px;
  border-radius: 5px;
  background: ${props => props.background};
  color: ${props => props.color};
  flex-direction: column;
  width: 100%;
  box-shadow: rgb(0 0 0 / 5%) 0px 2px 5px;
  > b{
    display: block;
    margin-bottom: 5px;
  }
  > span{
  }
`

const ChildWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 35px;
  a {
    display: inline-flex;
    position: relative;
    width: 33.3%;
    text-decoration: none;
    &:nth-of-type(2){
      margin-left: 15px;
      margin-right: 15px;
    }
  }
`

const Footer = styled.div`
  display: flex;
  padding: 10px 20px;
  border: 1px solid #d7e1e7;
  border-radius: 5px;
  color: rgba(0,0,0, 0.7);
  margin-top: 100px;
`

const Copy = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  color: rgba(0,0,0, 0.7);
`

const Index = observer(() => {
  const store = useStore();
  const { user, handleNotification } = store.user
  return(
    <Wrapper>
      <Container>
        <h1>Role</h1>
        <span>Choose your role to sign in</span>
        <ChildWrapper>
          {
            userRoles.map((any, index) => {
              const loginLink = `/${any.slug}/login`
              
              return(
                <Link to={loginLink} key={any.id}>                
                  <Card background={any.background} color={any.color}>
                    <b>{any.title}</b>
                    <span>{any.description}</span>
                  </Card>
                </Link>
              )
            })
          }
        </ChildWrapper>
        <Footer>
          This app allow you connect superadmin to client and staff directly with message feature, tracking time for the staff, and calculate the client cost
        </Footer>
        <Copy>
          <span>Created by Syafil m</span>
        </Copy>
      </Container>
    </Wrapper>
  )
})

export default Index