import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {ApiClients} from 'api'
import {ModelClient} from 'models'
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'
import Wrapper from '../Wrapper'
import 'react-input-range/lib/css/index.css'

const Content = styled.div`
  padding: 15px;
  @media ${Breakpoints.laptop} {
    max-width: 768px;
  }
  > button{
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

const New = observer(() => {
  const store = useStore();
  const { user, handleNotification } = store.user
  const { activeColor, activeBackground } = user
  const [client, setClient] = React.useState({
    email: '', emailError: '', phone: '',
    phoneError: '', name: '', nameError: '',
    surname: '', surnameError: '', tagOption: [],
    tag: [], tagError: '', departmentOption: [],
    department: {}, departmentOptionError: '', avatar: null,
    avatarPreviewExist: false, avatarEditor: false, avatarPreview: '',
    avatarError: '', position: { x: 1, y: 0.5 }, clientLoading: false,
    scale: 1, rotate: 0, borderRadius: 0, width: 300,
    height: 300, qualification: [],
    files: [],
    temporaryFiles: []
  })

  const [showModalAvatar, setShowModalAvatar] = React.useState(false)
  const avatarEditorRef = React.useRef(null)
  const clientRef = React.useRef(null)
  const formToCheck = ['email', 'phone', 'name']

  const saveImage = async() => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImage().toDataURL()
      const data = await fetch(canvas).then(res => res.blob())
      const metadata = {
        type: 'image/png', 
        lastModified: new Date().getTime(), 
        preview: window.URL.createObjectURL(data)
      }
      const file = client.avatar
      const name = file.name.substr(file.name.length -5).includes('jpeg') ? file.name.slice(0, -5) : file.name.slice(0, -4)
      const resultImage = new File([data], `${name}.png`, metadata)
      setClient(prev => ({
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

  const handleAvatar = (files) => {
    const imageError = Validation.image(files[0].name)
    
    if(imageError === ''){
      setClient(prev => ({
        ...prev,
        avatar: files[0],
        avatarPreview: files[0].preview
      }))
    }else{
      setClient(prev => ({...prev, avatarError: imageError}))
    }
  }

  const handleCancelAvatar = () => {
    setClient(prev => ({
      ...prev,
      avatar: null, 
      avatarPreview: '', 
      position: { x: 1, y: 0.5 }, 
      scale: 1
    }))
  }

  const handleInput = (type) => (e) => {
    const {value} = e.target
    setClient(prev => ({
      ...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type, true) === '' ? 
        Validation.checkEmail(value, type) : Validation.checkExist(value, type, true)) 
      : Validation.checkExist(value, type, true)
    }))
  }

  const handleInputSelect = (type) => (newValue) => {
    setClient(prev => ({
      ...prev, [type]: newValue,
      [`${type}Error`]: Validation.checkExist(newValue, type, true)
    }))
  }

  const createClient = async(client) => {
    try {
      const objectToSend = ModelClient.params(client)
      const data = await ApiClients.create(objectToSend)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  const checkForm = async(client) => {
    formToCheck.map(any => {
      setClient(prev =>
        ({...prev, [`${any}Error`]: Validation.checkExist(client[any], any, true)
      }))
    })
  }

  const submitClient = (client) => () => {
    setClient(prev => ({...prev, clientLoading: true}));
    checkForm(client).then(() => {
      if(clientRef.current === 0){
        createClient(client).then(() => {
          setClient(prev => ({...prev, clientLoading: false}));
        })
      }else{
        setClient(prev => ({...prev, clientLoading: false}));
        console.log('invalid')
      }
    })
  }

  clientRef.current = formToCheck.filter(any => client[`${any}Error`]).length

  return(
    <>
      <Wrapper>
        <Content>
          <Avatar>
            <div>
              <span>
                Upload Avatar
              </span>
              <div onClick={() => {setShowModalAvatar(true)}}>
                <span>{(client.avatarPreview !== '' && !client.avatarEditor) ? 'click here to edit' : 'click here to upload'}</span>
                {(client.avatarPreview !== '' && client.avatarPreviewExist) ? <img src={client.avatarPreview}/> : <img src={avatar} />}
              </div>
            </div>
            <span>
              You can leave this blank, image is optional, 
              <br/> you can only upload JPG PNG JPEG
            </span>
          </Avatar>
          <Input 
            label={
              (client.emailError === '' ? <label>Email</label> :
              <label className="error">{client.emailError}</label>)
            }
            placeholder="Enter email"
            value={client.email}
            error={client.emailError}
            type="text"
            onChange={handleInput('email')}
          />
          <Input 
            label={
              (client.phoneError === '' ? <label>Phone</label> :
              <label className="error">{client.phoneError}</label>)
            }
            placeholder="Enter phone"
            value={client.phone}
            error={client.phoneError}
            type="number"
            onChange={handleInput('phone')}
          />
          <Input 
            label={
              (client.nameError === '' ? <label>Name</label> :
              <label className="error">{client.nameError}</label>)
            }
            placeholder="Enter name"
            value={client.name}
            error={client.nameError}
            type="text"
            onChange={handleInput('name')}
          />
          <Input
            label={
              (client.surnameError === '' ? <label>Surname&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{client.surnameError}</label>)
            }
            placeholder="Enter surname"
            value={client.surname}
            error={client.surnameError}
            type="text"
            onChange={handleInput('surname')}
          />
          <Select
            label={
              (client.tagError === '' ? <label>Tags&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{client.tagError}</label>)
            }
            options={client.tagOption}
            multiple={true}
            error={client.tagError}
            onChange={handleInputSelect('tag')}
          />
          <Select
            label={
              (client.departmentOptionError === '' ? <label>Department&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{client.departmentOptionError}</label>)
            }
            options={client.departmentOption}
            value={client.department}
            error={client.departmentOptionError}
            onChange={handleInputSelect('department')}
          />
          <Button
            onClick={submitClient(client)}
            color={activeColor}
            background={activeBackground}
            loading={client.clientLoading}
            borderColor={activeBackground}>
            <b>  
              Create
            </b>
          </Button>
        </Content>
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
              client.avatar === null ?
              <>
                <Dropzone onDrop={handleAvatar} id="dropzone-preview">
                  <img src={avatar}/>
                </Dropzone>
                {client.avatarError !== '' && (<span>{client.avatarError}</span>) }
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
                    scale={parseFloat(client.scale)}
                    width={client.width}
                    height={client.height}
                    position={client.position}
                    onPositionChange={(position) => {
                      setClient(prev => ({...prev, position}))
                    }}
                    rotate={parseFloat(client.rotate)}
                    borderRadius={client.width / (100 / client.borderRadius)}
                    border={10}
                    image={client.avatar !== null && client.avatarPreview}
                    className="editor-canvas"
                  />
                  <Save onClick={saveImage}>Save</Save>
                </div>
                <Range>
                  <InputRange
                    maxValue={2}
                    minValue={1}
                    step={0.01}
                    value={client.scale}
                    onChange={(e) => {
                      setClient(prev => ({...prev, scale: e}))
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

export default New
