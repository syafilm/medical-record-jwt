import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select} from 'components'
import {Helpers, Breakpoints} from 'utils'
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import Wrapper from './Wrapper'

const Content = styled.div`
  padding: 15px;
  @media ${Breakpoints.laptop} {
    max-width: 768px;
  }
`

const Avatar = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  > img{
    border: 1px solid #d7e1e7;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  > span{
    margin-left: 15px;
  }
`

const Staffnew = observer(() => {
  const store = useStore();
  const { user, handleNotification } = store.user
  const {sidebarMenu} = Helpers
  const [staff, setStaff] = React.useState({
    email: '',
    emailError: '',
    phone: '',
    phoneError: '',
    name: '',
    nameError: '',
    surname: '',
    surnameError: '',
    tagOption: [],
    tag: [],
    tagError: '',
    departmentOption: [],
    departmentOptionValue: {},
    departmentOptionError: '',
  });

  return(
    <Wrapper>
      <Content>
        <Avatar>
          <img src={avatar} />
          <span>
            You can leave this blank, image is optional, 
            <br/> you can only upload JPG PNG JPEG
          </span>
        </Avatar>
        <Input 
          label={
            (staff.emailError === '' ? <label>Email</label> :
            <label className="error">{staff.emailError}</label>)
          }
          placeholder="Enter email"
          value={staff.email}
          error={staff.emailError}
          type="text"
          // onChange={handleInput('email')}
        />
        <Input 
          label={
            (staff.phoneError === '' ? <label>Phone</label> :
            <label className="error">{staff.phoneError}</label>)
          }
          placeholder="Enter phone"
          value={staff.phone}
          error={staff.phoneError}
          type="text"
          // onChange={handleInput('email')}
        />
        <Input 
          label={
            (staff.nameError === '' ? <label>Name</label> :
            <label className="error">{staff.nameError}</label>)
          }
          placeholder="Enter name"
          value={staff.name}
          error={staff.nameError}
          type="text"
          // onChange={handleInput('email')}
        />
        <Input 
          label={
            (staff.surnameError === '' ? <label>Surname</label> :
            <label className="error">{staff.surnameError}</label>)
          }
          placeholder="Enter surname"
          value={staff.surname}
          error={staff.surnameError}
          type="text"
          // onChange={handleInput('email')}
        />
        <Select
          label={
            (staff.tagError === '' ? <label>Tags</label> :
            <label className="error">{staff.tagError}</label>)
          }
          options={staff.tagOption}
          multiple={true}
          error={staff.tagError}
          // onChange={handleInputSelect(typeState, 'tag')}
          // formatOptionLabel={formatOptionLabel}
        />
        <Select
          label={
            (staff.departmentOptionError === '' ? <label>Department</label> :
            <label className="error">{staff.departmentOptionError}</label>)
          }
          options={staff.departmentOption}
          value={staff.departmentOptionValue}
          error={staff.departmentOptionError}/>
      </Content>
    </Wrapper>
  )
})

export default Staffnew