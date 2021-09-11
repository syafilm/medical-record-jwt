import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {ApiStaffs} from 'api'
import {ModelStaff} from 'models'
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
  const [staff, setStaff] = React.useState({
    email: '', emailError: '', phone: '',
    phoneError: '', name: '', nameError: '',
    surname: '', surnameError: '', tagOption: [],
    tag: [], tagError: '', departmentOption: [],
    department: {}, departmentOptionError: '', avatar: null,
    avatarPreviewExist: false, avatarEditor: false, avatarPreview: '',
    avatarError: '', position: { x: 1, y: 0.5 }, staffLoading: false,
    scale: 1, rotate: 0, borderRadius: 0, width: 300,
    height: 300, qualification: [],
    files: [],
    temporaryFiles: []
  })

  const [showModalAvatar, setShowModalAvatar] = React.useState(false)
  const avatarEditorRef = React.useRef(null)
  const staffRef = React.useRef(null)
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
      const file = staff.avatar
      const name = file.name.substr(file.name.length -5).includes('jpeg') ? file.name.slice(0, -5) : file.name.slice(0, -4)
      const resultImage = new File([data], `${name}.png`, metadata)
      setStaff(prev => ({
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
      setStaff(prev => ({
        ...prev,
        avatar: files[0],
        avatarPreview: files[0].preview
      }))
    }else{
      setStaff(prev => ({...prev, avatarError: imageError}))
    }
  }

  const handleCancelAvatar = () => {
    setStaff(prev => ({
      ...prev,
      avatar: null, 
      avatarPreview: '', 
      position: { x: 1, y: 0.5 }, 
      scale: 1
    }))
  }

  const handleInput = (type) => (e) => {
    const {value} = e.target
    setStaff(prev => ({
      ...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type, true) === '' ? 
        Validation.checkEmail(value, type) : Validation.checkExist(value, type, true)) 
      : Validation.checkExist(value, type, true)
    }))
  }

  const handleInputSelect = (type) => (newValue) => {
    setStaff(prev => ({
      ...prev, [type]: newValue,
      [`${type}Error`]: Validation.checkExist(newValue, type, true)
    }))
  }

  const createStaff = async(staff) => {
    try {
      const objectToSend = ModelStaff.params(staff)
      const data = await ApiStaffs.create(objectToSend)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  const checkForm = async(staff) => {
    formToCheck.map(any => {
      setStaff(prev =>
        ({...prev, [`${any}Error`]: Validation.checkExist(staff[any], any, true)
      }))
    })
  }

  const submitStaff = (staff) => () => {
    setStaff(prev => ({...prev, staffLoading: true}));
    checkForm(staff).then(() => {
      if(staffRef.current === 0){
        createStaff(staff).then(() => {
          setStaff(prev => ({...prev, staffLoading: false}));
        })
      }else{
        setStaff(prev => ({...prev, staffLoading: false}));
        console.log('invalid')
      }
    })
  }

  staffRef.current = formToCheck.filter(any => staff[`${any}Error`]).length

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
                <span>{(staff.avatarPreview !== '' && !staff.avatarEditor) ? 'click here to edit' : 'click here to upload'}</span>
                {(staff.avatarPreview !== '' && staff.avatarPreviewExist) ? <img src={staff.avatarPreview}/> : <img src={avatar} />}
              </div>
            </div>
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
            onChange={handleInput('email')}
          />
          <Input 
            label={
              (staff.phoneError === '' ? <label>Phone</label> :
              <label className="error">{staff.phoneError}</label>)
            }
            placeholder="Enter phone"
            value={staff.phone}
            error={staff.phoneError}
            type="number"
            onChange={handleInput('phone')}
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
            onChange={handleInput('name')}
          />
          <Input
            label={
              (staff.surnameError === '' ? <label>Surname&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{staff.surnameError}</label>)
            }
            placeholder="Enter surname"
            value={staff.surname}
            error={staff.surnameError}
            type="text"
            onChange={handleInput('surname')}
          />
          <Select
            label={
              (staff.tagError === '' ? <label>Tags&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{staff.tagError}</label>)
            }
            options={staff.tagOption}
            multiple={true}
            error={staff.tagError}
            onChange={handleInputSelect('tag')}
          />
          <Select
            label={
              (staff.departmentOptionError === '' ? <label>Department&nbsp;<span className="optional">(optional)</span></label> :
              <label className="error">{staff.departmentOptionError}</label>)
            }
            options={staff.departmentOption}
            value={staff.department}
            error={staff.departmentOptionError}
            onChange={handleInputSelect('department')}
          />
          <Button
            onClick={submitStaff(staff)}
            color={activeColor}
            background={activeBackground}
            loading={staff.staffLoading}
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
              staff.avatar === null ?
              <>
                <Dropzone onDrop={handleAvatar} id="dropzone-preview">
                  <img src={avatar}/>
                </Dropzone>
                {staff.avatarError !== '' && (<span>{staff.avatarError}</span>) }
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
                    scale={parseFloat(staff.scale)}
                    width={staff.width}
                    height={staff.height}
                    position={staff.position}
                    onPositionChange={(position) => {
                      setStaff(prev => ({...prev, position}))
                    }}
                    rotate={parseFloat(staff.rotate)}
                    borderRadius={staff.width / (100 / staff.borderRadius)}
                    border={10}
                    image={staff.avatar !== null && staff.avatarPreview}
                    className="editor-canvas"
                  />
                  <Save onClick={saveImage}>Save</Save>
                </div>
                <Range>
                  <InputRange
                    maxValue={2}
                    minValue={1}
                    step={0.01}
                    value={staff.scale}
                    onChange={(e) => {
                      setStaff(prev => ({...prev, scale: e}))
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