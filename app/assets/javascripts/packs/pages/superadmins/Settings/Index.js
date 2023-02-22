import React from 'react'
import styled from '@emotion/styled'
import {Link, useLocation} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import moment from 'moment'
import profile from 'images/profile.jpg'
import {Sidebar, Header, Input, Select, Modal, Toggle} from 'components'
import {Helpers, Validation} from 'utils'
import Wrapper from '../Wrapper'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'

const Menu = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  -ms-flex: 0 0 cacl(33.333333% - 1px);
  flex: 0 0 calc(33.333333% - 1px);
  max-width: calc(33.333333% - 1px);
  > b{
    padding: 10px 15px;
    border-bottom:1px solid #d7e1e7;
    display: block;
  }
  > li{
    &.red{
      a{
        color:#f56875;
      }
    }
    &.active{
      font-family: 'OpenSans Bold';
      > a{
        color: #4b988b;
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        align-items: center;
        &:after{
          content: '';
          width: 7px;
          height: 7px;
          background: #4b988b;
          border-radius: 5px;
          position: absolute;
          right: 0px;
          margin-bottom: -3.5px;
        }
      }
    }
    border-bottom:1px solid #d7e1e7;
    display: flex;
    padding: 10px 15px;
  }
`

const Settings = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
`

const Content = styled.div`
  -ms-flex: 0 0 66.666667%;
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  border-left: 1px solid #d7e1e7;
  > b{
    padding: 10px 15px;
    border-bottom: 1px solid #d7e1e7;
    display: block;
  }
`

const GeneralSetting = styled.ul`
  position: relative;
  padding: 0px;
  margin: 0px;
  list-style: none;
  > li{
    border-bottom:1px solid #d7e1e7;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    padding-bottom: 15px;
    >div{
      margin-bottom: 15px;
      &:last-of-type{
        margin-bottom: 0px;
      }
    }
  }
`

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  > h3, h4{
    font-family: 'OpenSans Bold';
  }
  > b{
    padding: 10px 15px;
    border-bottom: 1px solid #d7e1e7;
    display: block;
    width: 100%;
  }
`

const Avatar = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  > div{
    display: inline-block;
    > span{
      display: block;
      font-family: 'OpenSans Regular';
      font-size: 14px;
    }
    > div{
      width: 100px;
      height: 100px;
      position: relative;
      border-radius: 50%;
      > img{
        border: 1px solid #d7e1e7;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
      }
      > span{
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(0,0,0, 0.5);
        border: 1px solid #d7e1e7;
        cursor: pointer;
        color: #fff;
      }
      &:hover{
        > span{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  > img{
    border: 1px solid #d7e1e7;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  > span{
    margin-left: 15px;
    font-size: 14px;
  }
`

const Range = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  position: relative;
  top: 20px;
  .input-range__label-container{
    display: none;
  }
  .input-range__slider{
    background: #007bff;
    border-color: #007bff;
  }
  .input-range__track{
    background: #d7e1e7;
  }
  .input-range__track--active{
    background: #007bff;
  }
`

const Editor = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  > div{
    position: relative;
  }
  #dropzone-preview{
    width: 320px !important;
    height: 320px !important;
    border: 0px !important;
    border-radius: 0% !important;
    display: inline-flex !important;
    img{
      width: 320px;
      height: 320px;
      object-fit: cover;
      object-position: center;
      position: relative;
      border-radius: 0%;
    }
  }
  b{
    display: block;
    margin-top: 25px;
  }
  span{
    display: block;
  }
  #avatar-editor{
    i{
      color: #fff;
      background: #212529;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      top: -10px;
      right: -10px;
      cursor: pointer;
    }
  }
`

const Save = styled.span`
  width: 320px;
  height: 40px;
  background: #007bff;
  position: absolute;
  bottom: 21px;
  left: 0px;
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
`

const Backup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  > div{
    &:nth-of-type(1){
      label{
        margin-bottom: 3px;
        display: block;
      }
    }
  }
`

const settingsMenu = [
  {
    slug: 'general-setting',
    label: 'General Setting',
  },
  {
    slug: 'rates',
    label: 'Rates'
  },
  {
    slug: 'user-roles',
    label: 'User Roles'
  },
  {
    slug: 'employee-functions',
    label: 'Employee Functions'
  },
  {
    slug: 'tags',
    label: 'Tags',
  },
  {
    slug: 'qualifications',
    label: 'Qualifications'
  },
  {
    slug: 'logout',
    label: 'Logout'
  }
]

const lang = [
  {
    value: 'en',
    label: 'English (en)'
  },
  {
    value: 'de',
    label: 'Germany (de)'
  },
  {
    value: 'id',
    label: 'Indonesia (id)'
  }
]

const Index = observer(() => {
  const store = useStore();
  const location = useLocation()
  const { user, handleNotification } = store.user
  const { activeColor, activeBackground } = user
  const [settings, setSettings] = React.useState({
    name: '',
    nameError: '',
    surname: '',
    surnameError: '',
    currentPassword: '',
    currentPasswordError: '',
    password: '',
    passwordError: '',
    languange: '',
    languangeError: '',
    languageOption: lang,
    avatar: null,
    avatarPreviewExist: false, avatarEditor: false, avatarPreview: '',
    avatarError: '', position: { x: 1, y: 0.5 }, settingsLoading: false,
    scale: 1, rotate: 0, borderRadius: 0, width: 300,
    height: 300,
  })
  const query = new URLSearchParams(location.search)
  const menu = query.get('menu') === null ? 'general-setting' : query.get('menu')
  const activeData = settingsMenu.filter(a => a.slug === menu).length > 0 ? settingsMenu.find(a => a.slug === menu) : {}
  const [showModalAvatar, setShowModalAvatar] = React.useState(false)
  const avatarEditorRef = React.useRef(null);

  const handleInput = (type) => (e) => {
    const {value} = e.target
  }

  const handleInputSelect = (type) => (newValue) => {
    setClient(prev => ({
      ...prev,
      [type]: newValue,
      [`${type}Error`]: Validation.checkExist(newValue, type, true),
      typeInput: type
    }))
  }

  const handleAvatar = (files) => {
    const imageError = Validation.image(files[0].name)
    
    if(imageError === ''){
      setSettings(prev => ({
        ...prev,
        avatar: files[0],
        avatarPreview: files[0].preview
      }))
    }else{
      setSettings(prev => ({...prev, avatarError: imageError}))
    }
  }

  const handleCancelAvatar = () => {
    setSettings(prev => ({
      ...prev,
      avatar: null, 
      avatarPreview: '', 
      position: { x: 1, y: 0.5 }, 
      scale: 1
    }))
  }

  const saveImage = async() => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImage().toDataURL()
      const data = await fetch(canvas).then(res => res.blob())
      const metadata = {
        type: 'image/png', 
        lastModified: new Date().getTime(), 
        preview: window.URL.createObjectURL(data)
      }
      const file = settings.avatar
      const name = file.name.substr(file.name.length -5).includes('jpeg') ? file.name.slice(0, -5) : file.name.slice(0, -4)
      const resultImage = new File([data], `${name}.png`, metadata)
      setSettings(prev => ({
        ...prev,
        avatar: resultImage,
        avatarPreview: metadata.preview,
        avatarEditor: false,
        position: {x: 0, y: 0},
        avatarPreviewExist: true,
        scale: 1
      }))
      setShowModalAvatar(false)
    }
  }

  return(
    <>
      <Wrapper>
        <Settings>
          <Menu>
            <b>Settings</b>
            {
              settingsMenu.map(a => {
                const activeClass = a.slug === menu ? 'active' : (a.slug === 'logout' ? 'red' : '')
                return(
                  <li className={activeClass} key={a.slug}>
                    <Link to={`${a.slug}`}>{a.label}</Link>                
                  </li>
                )
              })
            }
          </Menu>
          <Content>
            {
              Object.keys(activeData).length > 0 &&
              <>
                <b>{activeData.label}</b>
                <GeneralSetting>
                  <Subtitle>
                    <b>General</b>
                  </Subtitle>
                  <li>
                    <Avatar>
                      <div>
                        <span>
                          Upload Avatar
                        </span>
                        <div onClick={() => {setShowModalAvatar(true)}}>
                          <span>{(settings.avatarPreview !== '' && !settings.avatarEditor) ? 'click here to edit' : 'click here to upload'}</span>
                          {(settings.avatarPreview !== '' && settings.avatarPreviewExist) ? <img src={settings.avatarPreview}/> : <img src={avatar} />}
                        </div>
                      </div>
                      <span>
                        You can leave this blank, image is optional, 
                        <br/> you can only upload JPG PNG JPEG
                      </span>
                    </Avatar>
                    <Input
                      label={
                        (settings.nameError === '' ? <label>Name</label> :
                        <label className="error">{settings.nameError}</label>)
                      }
                      placeholder="Name"
                      value={settings.name}
                      error={settings.nameError}
                      type="text"
                      onChange={handleInput('name')}
                    />
                    <Input
                      label={
                        (settings.surnameError === '' ? <label>Surname</label> :
                        <label className="error">{settings.surnameError}</label>)
                      }
                      placeholder="Surname"
                      value={settings.surname}
                      error={settings.surnameError}
                      type="text"
                      onChange={handleInput('surname')}
                    />
                    <Select
                      label={
                        (settings.languangeError === '' ? <label>Languange</label> :
                        <label className="error">{settings.languangeError}</label>)
                      }
                      options={settings.languageOption}
                      value={settings.languange}
                      error={settings.languangeError}
                      onChange={handleInputSelect('languange')}
                    />
                  </li>
                  <Subtitle>
                    <b>Password</b>
                  </Subtitle>
                  <li>
                    <Input
                      label={
                        (settings.currentPasswordError === '' ? <label>Current Password</label> :
                        <label className="error">{settings.currentPasswordError}</label>)
                      }
                      placeholder="Current Password"
                      value={settings.currentPassword}
                      error={settings.currentPasswordError}
                      type="text"
                      onChange={handleInput('currentPassword')}
                    />
                    <Input
                      label={
                        (settings.passwordError === '' ? <label>New password</label> :
                        <label className="error">{settings.passwordError}</label>)
                      }
                      placeholder="New password"
                      value={settings.password}
                      error={settings.passwordError}
                      type="text"
                      onChange={handleInput('password')}
                    />
                  </li>
                  <Subtitle>
                    <b>Backup Setting</b>
                  </Subtitle>
                  <li>
                    <Backup>
                      <div>
                        <label>Make regular automatic back-ups</label>
                        <Toggle/>
                      </div>
                    </Backup>
                  </li>
                </GeneralSetting>
                
              </>
            }
          </Content>
        </Settings>
      </Wrapper>
      <Modal
        show={showModalAvatar}
        onClose={() => {
          setShowModalAvatar(false)
        }}
        width={`400px`} 
        height={`540px`}>
        <Editor>
          <div>
            {
              settings.avatar === null ?
              <>
                <Dropzone onDrop={handleAvatar} id="dropzone-preview">
                  <img src={avatar}/>
                </Dropzone>
                {settings.avatarError !== '' && (<span>{settings.avatarError}</span>) }
                <b>Drag image right here or click to upload</b>
              </>
              :
              <>
                <div id="avatar-editor">
                  <span onClick={handleCancelAvatar}>
                    <i className="la la-times"></i>
                  </span>
                  <AvatarEditor
                    ref={avatar => (avatarEditorRef.current = avatar)}
                    scale={parseFloat(settings.scale)}
                    width={settings.width}
                    height={settings.height}
                    position={settings.position}
                    onPositionChange={(position) => {
                      setSettings(prev => ({...prev, position}))
                    }}
                    rotate={parseFloat(settings.rotate)}
                    borderRadius={settings.width / (100 / settings.borderRadius)}
                    border={10}
                    image={settings.avatar !== null && settings.avatarPreview}
                    className="editor-canvas"
                  />
                  <Save onClick={saveImage}>Save</Save>
                </div>
                <Range>
                  <InputRange
                    maxValue={2}
                    minValue={1}
                    step={0.01}
                    value={settings.scale}
                    onChange={(e) => {
                      setSettings(prev => ({...prev, scale: e}))
                    }}
                  />
                </Range>
              </>
            }
          </div>
        </Editor>
      </Modal>
    </>
  )
})

export default Index
