import React from 'react'
import styled from '@emotion/styled'
import {Link, useParams, useLocation} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button, Dialog} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {
  ApiClients, 
  ApiDocuments, 
  ApiClinicStructures,
  ApiClinicAddresses,
  ApiEmployeeStates,
  ApiBankAccounts,
  ApiDepartments,
  ApiContacts
} from 'api'
import {ModelClient, ModelDocument} from 'models'
import {confirmAlert} from 'react-confirm-alert'
import {useDebounce} from 'use-debounce'
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'
import Wrapper from '../Wrapper'
import uuid from 'uuid'
import Information from './elements/Detail/Information'
import Profile from './elements/Detail/Profile'

const clinicStucture = [
  'department',
  'contact',
  'contactEmail',
  'contactPhone',
  'earlyStart',
  'earlyEnd',
  'middleStart',
  'middleEnd',
  'lateStart', 
  'lateEnd'
]
const clinicAddress = ['streetname', 'streetnumber', 'zipCode', 'region', 'country', 'companyName', 'ceoOwner', 'website', 'phoneClinic']
const employeeState = ['entry', 'exit', 'contract']
const bankAccount = ['bankname', 'iban', 'bic', 'accountHolder']

const Content = styled.div`
  display: flex;
  flex-direction: column;
  > button{
    width: 100%;
  }
`

const Box = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`

const Tab = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  > li{
    display: inline-flex;
    margin-right: 10px;
    a{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ECF1F4;
      padding: 6px 12px;
      border-radius: 5px;
      color: #4b988b;
      cursor: pointer;
      text-decoration: none;
      &.active {
        background: #4b988b;
        color: #ECF1F4;
      }
    }
  }
`

const Attachment = styled.div`
  padding: 15px;
  > button{
    width: 100%;
    margin-top: 15px;
  }
  #dropzone-preview{
    width: 100% !important;
    height: 50px !important;
    border: 1px dashed rgb(102, 102, 102) !important;
    border-radius: 5px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > span{
      font-size: 14px;
    }
  }
  > h4{
    font-family: 'OpenSans Bold';
    margin-bottom: 10px;
  }
  > ul{
    display: flex;
    padding: 0px;
    margin: 0px;
    margin-bottom: 15px;
    flex-direction: column;
    > li{
      display: flex;
      align-items: flex-start;
      margin-bottom: 5px;
      > i{
        font-size: 34px;
        width: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      > div{
        margin-left: 10px;
        width: 100%;
        position: relative;
        > i{
          right: 0px;
          position: absolute;
          width: 16px;
          height: 16px;
          top: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #000;
          color: #fff;
          font-size: 10px;
          font-style: normal;
          cursor: pointer;
        }
        > span{
          display: flex;
          font-size: 14px;
          width: 100%;
          &:nth-of-type(2){
            font-size: 13px;
          }
          &:nth-of-type(1){
            margin-bottom: 0px;
            font-family: 'OpenSans Bold';
            position: relative;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            -webkit-line-clamp: 1;
            width: 95%;
            color: #4b988b;
          }
        }
      }
    }
  }
`

const General = styled.div`
  display: flex;
  padding: 15px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  @media ${Breakpoints.laptop} {
    max-width: 768px;
  }
  > h3, h4{
    font-family: 'OpenSans Bold';
  }
`

const Form = styled.div`
  display: block;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`

const Wardtime = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  &:nth-of-type(1), 
  &:nth-of-type(2),
  &:nth-of-type(3){
    > div{
      > div{
        > div{
          &:nth-of-type(1){
            margin-right: 30px;
          }
        }
      }
    }
  }
  > div{
    width: 33.3%;
    padding-left: 15px;
    padding-right: 15px;
    display: inline-flex;
    flex-direction: column;
    > label{
      display: flex;
    }
    > div{
      width: 100%;
      display: inline-flex;
      > div{
        width: 50%;
      }
    }
    input{
      min-width: unset;
      width: auto;
    }
  }
`

const Wardcontact = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 50%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  > h3, h4{
    font-family: 'OpenSans Bold';
  }
  > div{
    display: inline-flex;
    align-items:center;
    margin-left: auto;
    color: #4b988b;
    > span{
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      &:nth-of-type(2){
        margin-left: 10px;
      }
      &:nth-of-type(1){
        > b{
          font-size: 12px;
          i{
            position: relative;
            top: 1px;
          }
        }
      }
      > b{
        margin-right: 5px;
        color: #4b988b;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid #4b988b;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-style: normal;
      }
    }
  }
`

const Employeetime = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 32.3%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Address = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 50%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Region = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 32.3%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Company = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 50%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Banking = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 50%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Detail = observer(() => {
  const location = useLocation();
  const store = useStore()
  const {slug} = useParams()
  const { user, handleNotification } = store.user
  const { activeColor, activeBackground } = user
  const query = new URLSearchParams(location.search)
  const tab = query.get('tab') === null ? 'information' : query.get('tab');
  const [client, setClient] = React.useState({
    detail: {}, clientLoading: true, formFileLoading: false,
    typeInput: '',
    attachments: [], attachmentsLoading: [], temporaryAttachments: [],
    fileError: '', activeTab: tab, modelId: '',

    // --- clinic structure --- //
    modelType: 'client', department: '', departmentOption: [],
    departmentError: '',
    contact: '',
    contactOption: [],
    contactError: '',
    earlyStart: '',
    earlyStartError: '',
    earlyEnd: '',
    earlyEndError: '',
    middleStart: '',
    middleStartError: '',
    middleEnd: '',
    middleEndError: '',
    lateStart: '',
    lateStartError: '',
    lateEnd: '',
    lateEndError: '',
    contactEmail: '', 
    contactEmailError: '',
    contactPhone: '',
    contactPhoneError: '', 
    entry: '',
    entryError: '',
    exit: '', exitError: '',
    contract: '', contractError: '',
    streetname: '', streetnameError: '',
    streetnumber: '', streetnumberError: '',
    zipCode: '', zipCodeError: '',
    region: '', regionError: '',
    country: '', countryError: '',
    companyName: '', companyNameError: '',
    ceoOwner: '', ceoOwnerError: '',
    website: '', websiteError: '',
    phoneClinic: '', phoneClinicError: '',
    bankname: '', banknameError: '',
    iban: '', ibanError: '',
    bic: '', bicError: '',
    accountHolder: '', 
    accountHolderError: '',
    contactId: '',
    clinicStuctureId: '',
    clinicAddressId: '',
    bankAccountId: '',
    employeeStateId: '',
   // --- clinic structure --- //

  })
  const [showModalAttachment, setShowModalAttachment] = React.useState(false);
  const [activeInputValue] = useDebounce(client[client.typeInput], 2000);
  const {hexToRgb, detailTabClient, readablizeBytes, camelToSnakeCase, snakeToCamelCase} = Helpers

  const getClientsDetail = async(slug) => {
    try {
      const detail = await ApiClients.detail(slug)
      const departments = await ApiDepartments.list()
      const contacts = await ApiContacts.list()
      const clinicStructureId = detail?.data?.clinic_structure.id
      await getClinicStructuresDetail(clinicStructureId)

      setClient(prev => ({...prev, 
        detail: detail.data,
        clientLoading: false,
        modelId: detail.data.id,
        departmentOption: departments.data,
        contactOption: contacts.data
        // attachments: attachment.data,
        // temporaryAttachments: attachment.data,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const getClinicStructuresDetail = async(slug) => {
    try {
      const detail = await ApiClinicStructures.detail(slug)
      const entry = detail?.data?.employee_state?.entry?.split('T')[0] || ''
      const exit = detail?.data?.employee_state?.exit?.split('T')[0] || ''
      const contract = detail?.data?.employee_state?.contract?.split('T')[0] || ''

      setClient(prev => ({...prev,
        modelType: 'client', 
        department: detail?.data?.department || '',
        departmentOption: [],
        departmentError: '',
        contact: detail?.data?.contact?.object,
        contactId: detail?.data?.contact?.id || '',
        contactEmail: detail?.data?.contact?.email || '',
        contactPhone: detail?.data?.contact?.phone || '',
        contactOption: [],
        earlyStart: detail?.data?.early_start || '',
        earlyEnd: detail?.data?.early_end || '',
        middleStart: detail?.data?.middle_start || '',
        middleEnd: detail?.data?.middle_end || '',
        lateStart: detail?.data?.late_start || '',
        lateEnd: detail?.data?.late_end || '',
        entry,
        exit,
        contract,
        streetname: detail?.data?.clinic_address?.streetname || '',
        streetnumber: detail?.data?.clinic_address?.streetnumber || '',
        zipCode: detail?.data?.clinic_address?.zip_code || '',
        region: detail?.data?.clinic_address?.region || '',
        country: detail?.data?.clinic_address?.country || '',
        companyName: detail?.data?.clinic_address?.company_name || '',
        ceoOwner: detail?.data?.clinic_address?.ceo_owner || '',
        website: detail?.data?.clinic_address?.website || '',
        phoneClinic: detail?.data?.clinic_address?.phone_clinic || '',
        bankname: detail?.data?.bank_account?.bankname || '',
        iban: detail?.data?.bank_account?.iban || '',
        bic: detail?.data?.bank_account?.bic || '',
        accountHolder: detail?.data?.bank_account?.account_holder || '',
        clinicAddressId: detail?.data?.clinic_address_id || '',
        bankAccountId: detail?.data?.bank_account_id || '',
        employeeStateId: detail?.data?.employee_state_id || '',
        clinicStuctureId: detail?.data?.id || '',
        typeInput: '',
      }))

    } catch (e) {
      console.log(e)
    }
  }

  const updateClinicStructureDetail = async(value, attr) => {
    try {
      const snakeCaseAttr = camelToSnakeCase(attr)
      if(clinicAddress.includes(attr)){
        const formClinicAddress = new FormData()
        formClinicAddress.append(`clinic_address[${snakeCaseAttr}]`, value);
        const dataClinicAddress = await ApiClinicAddresses.update(client.clinicAddressId, formClinicAddress)
        console.log(dataClinicAddress, 'dataClinicAddress')
      }else if(clinicStucture.includes(attr)){
        const formClinicStructure = new FormData()
        const formContact = new FormData()
        const contact = ['contactEmail', 'contactPhone']
        if(attr === 'contact'){
          formClinicStructure.append(`clinic_structure[${snakeCaseAttr}]`, value.label)
          const dataClinicStructureContact = await ApiClinicStructures.update(client.clinicStuctureId, formClinicStructure)
          console.log(dataClinicStructureContact, 'dataClinicStructureContact')
        }else if(contact.includes(attr)){
          const newSnakeCaseAttr = snakeCaseAttr.replace('contact_', '')
          formContact.append(`contact[${newSnakeCaseAttr}]`, value)
          const dataContact = await ApiContacts.update(client.contactId, formContact)
          console.log(dataContact, 'dataContact')
        }else{
          formClinicStructure.append(`clinic_structure[${snakeCaseAttr}]`, value)
          const dataClinicStructure = await ApiClinicStructures.update(client.clinicStuctureId, formClinicStructure)
          console.log(dataClinicStructure, 'dataClinicStructure')
        }

      }else if(employeeState.includes(attr)){
        const formEmployee = new FormData()
        formEmployee.append(`employee_state[${snakeCaseAttr}]`, value);
        const dataEmployeeState = await ApiEmployeeStates.update(client.employeeStateId, formEmployee)
        console.log(dataEmployeeState, 'dataEmployeeState')
      }else if(bankAccount.includes(attr)){
        const formBank = new FormData()
        formBank.append(`bank_account[${snakeCaseAttr}]`, value);
        const dataBankAccount = await ApiBankAccounts.update(client.bankAccountId, formBank)
        console.log(dataBankAccount, 'dataBankAccount')
      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleFile = (client) => (attachments) => {
    const newFiles = attachments.filter(any => (Validation.file(any.name) === ''))
    
    let i = 0
    while (i < newFiles.length) {
      const total = i++
      const theFile = {
        name: newFiles[total].name, 
        size: newFiles[total].size,
        file: {
          url: newFiles[total].preview
        },
        uuid: uuid.v4(),
        progress: {}
      }
      handleUploadFile(client, newFiles[total], theFile.uuid)
      setClient(prev => ({...prev, temporaryAttachments: prev.temporaryAttachments.concat(theFile)}))
    }
  }

  const handleUploadProgress = (uuid) => (progress) => {
    setClient(prev => ({
      ...prev, 
      temporaryAttachments: prev.temporaryAttachments.map(a => {
        if(a.uuid === uuid){
          return{...a, progress}
        }
        return {...a}
      })
    }))
  }

  const handleDeleteFile = async(id) => {
    try {
      const {data} = await ApiDocuments.destroy(id)
      if (process.env.ENV_APP === 'development') {
        console.log('file successfully deleted')
        getClientsDetail(slug)
      }
    } catch (e) {
      console.log(e)      
    }
  }

  const handleUploadFile = async(client, file, uuid) => {
    try {
      const objectToSend = ModelDocument.params({...client, file, uuid})
      const {data} = await ApiDocuments.create(objectToSend, handleUploadProgress(uuid))
      setClient(prev => 
        ({...prev,
          temporaryAttachments: prev.temporaryAttachments.map(a => {
            if(a.uuid === data.uuid){
              return{...a, ...data, progress: {}}
            }
            return {...a}
          })
        }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputSelect = (type) => (newValue) => {
    setClient(prev => ({
      ...prev,
      [type]: newValue,
      [`${type}Error`]: Validation.checkExist(newValue, type, true),
      typeInput: type
    }))
  }

  const handleInput = (type) => (e) => {
    const {value} = e.target
    setClient(prev => ({
      ...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type, true) === '' ? 
        Validation.checkEmail(value, type) : Validation.checkExist(value, type, true))
      : Validation.checkExist(value, type, true),
      typeInput: type
    }))
  }

  const confirmDeleteFile = (id) => () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text="Are you sure want to delete this file?"
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              handleDeleteFile(id);
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  };

  React.useEffect(() => {
    if(Validation.checkExist(client.typeInput)){
      updateClinicStructureDetail(activeInputValue, client.typeInput).then(() => {
        getClientsDetail(slug)
      })
    }else{
      getClientsDetail(slug)
    }
  }, [slug, tab, activeInputValue])

  const {r, g, b} = hexToRgb(activeBackground)
  const {
    detail, activeTab, temporaryAttachments, formFileLoading,
    departmentError, departmentOption, department,
    early, earlyError, middle, middleError, late, lateError,
    contact, contactError, contactOption,
    contactEmail, contactEmailError, 
    contactPhone, contactPhoneError,
    entry, entryError, exit, exitError,
    contract, contractError,
    streetname, streetnameError, streetnumber, 
    streetnumberError, zipCode, zipCodeError,
    region, regionError,
    country, countryError,
    companyName, companyNameError,
    ceoOwner, ceoOwnerError,
    website, websiteError,
    phoneClinic, phoneClinicError,
    bankname, banknameError,
    iban, ibanError,
    bic, bicError,
    accountHolder, 
    accountHolderError,
    earlyStart,
    earlyStartError,
    earlyEnd,
    earlyEndError,
    middleStart,
    middleStartError,
    middleEnd,
    middleEndError,
    lateStart,
    lateStartError,
    lateEnd,
    lateEndError
  } = client

  if (process.env.ENV_APP === 'development') console.log(client, 'object state')

  return(
    <>
      <Wrapper>
        <Content>
          {
            Object.keys(detail).length > 0 &&
            <>
              <Profile detail={detail}/>
              <Box>
                <Tab>
                  {detailTabClient.map((a) => {
                    return <li key={a.slug}>
                      <Link
                        onClick={() => setClient(prev => ({...prev, activeTab: a.slug}))}
                        replace
                        to={`${location.pathname}?tab=${a.slug}`} 
                        className={`${a.slug === activeTab ? `active` : ``}`}>
                        {a.label}
                      </Link>
                    </li>
                  })}
                </Tab>
                {
                  activeTab === 'information' &&
                  (<Information
                    client={client}
                    setShowModalAttachment={setShowModalAttachment}
                    confirmDeleteFile={confirmDeleteFile}
                    readablizeBytes={readablizeBytes}
                  />)
                }
                {
                  activeTab === 'general' && 
                  (
                    <General>
                      <Subtitle>
                        <h4>Clinic Structure</h4>
                        <div>
                          {/* &bull; */}
                          <span><b>+</b> Add</span>
                        </div>
                      </Subtitle>
                      <Form>
                        <Select
                          label={
                            (departmentError === '' ? <label>Department&nbsp;<span className="optional">(optional)</span></label> :
                            <label className="error">{departmentError}</label>)
                          }
                          options={departmentOption}
                          value={department}
                          error={departmentError}
                          onChange={handleInputSelect('department')}
                        />
                        <Wardtime>
                          <div>
                            <label>Early shift time (start - end)</label>
                            <div>
                              <Input
                                label={null}
                                placeholder="Early start shift"
                                value={earlyStart}
                                error={earlyStartError}
                                type="time"
                                onChange={handleInput('earlyStart')}
                              />
                              <Input
                                label={null}
                                placeholder="Early end shift"
                                value={earlyEnd}
                                error={earlyEndError}
                                type="time"
                                onChange={handleInput('earlyEnd')}
                              />
                            </div>
                          </div>
                          <div>
                            <label>Mid shift time (start - end)</label>
                            <div>
                              <Input 
                                label={null}
                                placeholder="Mid shift"
                                value={middleStart}
                                error={middleStartError}
                                type="time"
                                onChange={handleInput('middleStart')}
                              />
                              <Input 
                                label={null}
                                placeholder="Mid shift"
                                value={middleEnd}
                                error={middleEndError}
                                type="time"
                                onChange={handleInput('middleEnd')}
                              />
                            </div>
                          </div>
                          <div>
                            <label>Late shift time (start - end)</label>
                            <div>
                              <Input 
                                label={null}
                                placeholder="Mid shift"
                                value={lateStart}
                                error={lateStartError}
                                type="time"
                                onChange={handleInput('lateStart')}
                              />
                              <Input 
                                label={null}
                                placeholder="Mid shift"
                                value={lateEnd}
                                error={lateEndError}
                                type="time"
                                onChange={handleInput('lateEnd')}
                              />
                            </div>
                          </div>
                        </Wardtime>
                        <Select
                          label={
                            (contactError === '' ? <label>Main Contact on Ward</label> :
                            <label className="error">{contactError}</label>)
                          }
                          options={contactOption}
                          value={contact}
                          error={contactError}
                          onChange={handleInputSelect('contact')}
                        />
                        <Wardcontact>
                          <Input 
                            label={null}
                            placeholder="Contact email"
                            value={contactEmail}
                            error={contactEmailError}
                            type="text"
                            onChange={handleInput('contactEmail')}
                          />
                          <Input
                            label={null}
                            placeholder="Contact number"
                            value={contactPhone}
                            error={contactPhoneError}
                            type="text"
                            onChange={handleInput('contactPhone')}
                          />
                        </Wardcontact>
                      </Form>
                      <Subtitle>
                        <h4>Employee State</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Employeetime>
                          <Input 
                            label={
                              (entryError === '' ? <label>Entry Date</label> :
                              <label className="error">{entryError}</label>)
                            }
                            placeholder="Entry date"
                            value={entry}
                            error={entryError}
                            type="date"
                            onChange={handleInput('entry')}
                          />
                          <Input 
                            label={
                              (exitError === '' ? <label>Exit Date</label> :
                              <label className="error">{exitError}</label>)
                            }
                            placeholder="Exit Date"
                            value={exit}
                            error={exitError}
                            type="date"
                            onChange={handleInput('exit')}
                          />
                          <Input 
                            label={
                              (contractError === '' ? <label>Contract until</label> :
                              <label className="error">{contractError}</label>)
                            }
                            placeholder="Contract until"
                            value={contract}
                            error={contractError}
                            type="date"
                            onChange={handleInput('contract')}
                          />
                        </Employeetime>
                      </Form>
                      <Subtitle>
                        <h4>Clinic Adress</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Address>
                          <Input 
                            label={
                              (streetnameError === '' ? <label>Streetname</label> :
                              <label className="error">{streetnameError}</label>)
                            }
                            placeholder="Street"
                            value={streetname}
                            error={streetnameError}
                            type="text"
                            onChange={handleInput('streetname')}
                          />
                          <Input 
                            label={
                              (streetnumberError === '' ? <label>Streetnumber</label> :
                              <label className="error">{streetnumberError}</label>)
                            }
                            placeholder="Street number"
                            value={streetnumber}
                            error={streetnumberError}
                            type="text"
                            onChange={handleInput('streetnumber')}
                          />
                        </Address>
                        <Region>
                          <Input
                            label={
                              (zipCodeError === '' ? <label>Zip code</label> :
                              <label className="error">{zipCodeError}</label>)
                            }
                            placeholder="Zipcode"
                            value={zipCode}
                            error={zipCodeError}
                            type="text"
                            onChange={handleInput('zipCode')}
                          />
                          <Input
                            label={
                              (regionError === '' ? <label>Region</label> :
                              <label className="error">{regionError}</label>)
                            }
                            placeholder="Region"
                            value={region}
                            error={regionError}
                            type="text"
                            onChange={handleInput('region')}
                          />
                          <Input
                            label={
                              (countryError === '' ? <label>Country</label> :
                              <label className="error">{countryError}</label>)
                            }
                            placeholder="Country"
                            value={country}
                            error={countryError}
                            type="text"
                            onChange={handleInput('country')}
                          />
                        </Region>
                        <Company>
                          <Input
                            label={
                              (companyNameError === '' ? <label>Company Name</label> :
                              <label className="error">{companyNameError}</label>)
                            }
                            placeholder="Company"
                            value={companyName}
                            error={companyNameError}
                            type="text"
                            onChange={handleInput('companyName')}
                          />
                          <Input
                            label={
                              (ceoOwnerError === '' ? <label>CEO / Owner</label> :
                              <label className="error">{ceoOwnerError}</label>)
                            }
                            placeholder="CEO / Owner"
                            value={ceoOwner}
                            error={ceoOwnerError}
                            type="text"
                            onChange={handleInput('ceoOwner')}
                          />
                        </Company>
                        <Company>
                          <Input
                            label={
                              (websiteError === '' ? <label>Website</label> :
                              <label className="error">{websiteError}</label>)
                            }
                            placeholder="Website"
                            value={website}
                            error={websiteError}
                            type="text"
                            onChange={handleInput('website')}
                          />
                          <Input
                            label={
                              (phoneClinicError === '' ? <label>Telephone Clinic</label> :
                              <label className="error">{phoneClinicError}</label>)
                            }
                            placeholder="Telephone Clinic"
                            value={phoneClinic}
                            error={phoneClinicError}
                            type="text"
                            onChange={handleInput('phoneClinic')}
                          />
                        </Company>
                      </Form>
                      <Subtitle>
                        <h4>Banking</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Banking>
                          <Input
                            label={
                              (banknameError === '' ? <label>Bankname</label> :
                              <label className="error">{banknameError}</label>)
                            }
                            placeholder="Bankname"
                            value={bankname}
                            error={banknameError}
                            type="text"
                            onChange={handleInput('bankname')}
                          />
                          <Input
                            label={
                              (ibanError === '' ? <label>IBAN</label> :
                              <label className="error">{ibanError}</label>)
                            }
                            placeholder="IBAN"
                            value={iban}
                            error={ibanError}
                            type="text"
                            onChange={handleInput('iban')}
                          />
                        </Banking>
                        <Banking>
                          <Input
                            label={
                              (bicError === '' ? <label>BIC</label> :
                              <label className="error">{bicError}</label>)
                            }
                            placeholder="BIC"
                            value={bic}
                            error={bicError}
                            type="text"
                            onChange={handleInput('bic')}
                          />
                          <Input
                            label={
                              (accountHolderError === '' ? <label>Account Holder</label> :
                              <label className="error">{accountHolderError}</label>)
                            }
                            placeholder="Account Holder"
                            value={accountHolder}
                            error={accountHolderError}
                            type="text"
                            onChange={handleInput('accountHolder')}
                          />
                        </Banking>
                      </Form>
                    </General>
                  )
                }
              </Box>
            </>
          }
        </Content>
      </Wrapper>
      <Modal
        show={showModalAttachment}
        onClose={() => {
          setShowModalAttachment(false)
        }}
        width={`400px`} 
        height={`auto`}>
        <Attachment>
          <h4>Attachment</h4>
          {
            temporaryAttachments.length > 0 &&
            <ul>
              {temporaryAttachments.map((a, index) => {
                return(
                  <li key={index}>
                    <i className="las la-file-alt"></i>
                    <div>
                      <span>{a.name}</span>
                      <span>
                        {
                          (Object.keys(a).includes('progress') && 
                          Object.keys(a.progress).length > 0) ?
                          `${readablizeBytes(a.progress.loaded)} / ${readablizeBytes(a.size)} ${Math.round((a.progress.loaded * 100) / a.progress.total)}%` :
                          `${readablizeBytes(a.size)}`
                        }
                      </span>
                      {
                        Object.keys(a).includes('created_at') && 
                        <i onClick={confirmDeleteFile(a.id)}>x</i>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(client)} id="dropzone-preview">
            <span>Pilih file</span>
          </Dropzone>
          <Button
            onClick={() => {
              setShowModalAttachment(false)
              getClientsDetail(slug)
            }}
            color={activeColor}
            background={activeBackground}
            customLoading={true}
            loadingChildren={
              <span>10%</span>
            }
            loading={formFileLoading}
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Attachment>
      </Modal>
    </>

  )
})

export default Detail