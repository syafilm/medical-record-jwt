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
  ApiContacts,
  ApiPriceConditions,
  ApiJobs,
  ApiPriceSettings
} from 'api'
import {ModelClient, ModelDocument, ModelPriceCondition} from 'models'
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
import General from './elements/Detail/General'

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
const priceSetting = ['notes', 'vatNr']

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

const PriceSetting = styled.div`
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

const Condition = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Percentage = styled.div`
  display: inline-flex;
  width: 100%;
  > div{
    width: 50%;
    &:nth-of-type(1){
      padding-right: 15px;
    }
    &:nth-of-type(2){
      padding-left: 15px;
    }
    > input{
      width: auto;
      min-width: unset;
    }
  }
`

const Table = styled.table`
  width: 100%;
  margin-bottom: 0rem;
  color: #212529;
  border-collapse: collapse;
  display: table;
  border-color: grey;
  > thead{
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    > tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }
    th{
      display: table-cell;
      vertical-align: inherit;
      vertical-align: bottom;
      border-bottom: 1px solid #dee2e6;
      font-family: 'OpenSans Bold';
      padding: .75rem;
      vertical-align: top;
      border-top: 0px solid #dee2e6;
      text-align:left;
      &:nth-of-type(1){
        width: 30%;
        padding-left: 0px;
      }
      &:nth-of-type(4){
        padding-right: 0px;
      }
    }
  }
  > tbody{
    tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
      &:nth-of-type(odd){
        background-color: rgba(44, 189, 165, 0.1);
      }
    }
    td{
      display: table-cell;
      vertical-align: inherit;
      padding: .75rem;
      vertical-align: top;
      border-top: 0px solid #dee2e6;
      font-size: 14px;
      &:nth-of-type(1){
        padding-left: 0px;
      }
      &:nth-of-type(4){
        padding-right: 0px;
      }
      > span{
        position: relative;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-line-clamp: 1;
      }
    }
  }
`

const Action = styled.p`
  display: flex;
  align-items: center;
  margin: 0px;
  > i{
    font-size: 20px;
    cursor: pointer;
    &:nth-of-type(1){
      margin-right: 10px;
    }
    &:nth-of-type(2){
      margin-left: 10px;
    }
  }
`

const Customer = styled.div`
  > div{
    &:nth-of-type(1){
      margin-bottom: 15px;
    }
  }
`

const Notes = styled.div`
  > div{
    &:nth-of-type(1){
      margin-bottom: 15px;
    }
  }
`

const Documents = styled.div`
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

const Archives = styled.div`
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

const Detail = observer(() => {
  const location = useLocation()
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
    archives: [],
    temporaryArchives: [],
    archivesLoading: [],
    // this is for general tab 
    // --- clinic structure --- //
    // this is for general tab 
    modelType: 'client', 
    department: '', departmentOption: [],
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
   // this is for general tab 
   
   // this is for price setting
   priceConditions: [],
   priceConditionId: '',
   job: {},
   jobOption: [],
   jobError: '',
   hourlyRate: 0,
   hourlyRateError: '',
   vat: 0,
   vatError: '',
   percentageZero: 0,
   percentageZeroError: '',
   percentageOne: 0,
   percentageOneError: '',
   percentageTwo: 0,
   percentageTwoError: '',
   percentageThree: 0,
   percentageThreeError: '',
   notes: '',
   notesError: '',
   vatNr: '',
   vatNrError: '',
   // this is for price setting

  })
  const [showModalAttachment, setShowModalAttachment] = React.useState(false);
  const [showModalCondition, setShowModalCondition] = React.useState(false);
  const [showModalArchives, setShowModalArchives] = React.useState(false);
  const [activeInputValue] = useDebounce(client[client.typeInput], 2000);
  const {hexToRgb, 
    detailTabClient, 
    readablizeBytes, 
    camelToSnakeCase, 
    snakeToCamelCase,
    capitalizeFirstLetter
  } = Helpers

  const getClientsDetail = async(slug) => {
    try {
      const detail = await ApiClients.detail(slug)
      const documentAttachment = await ApiDocuments.list(slug, 'client', 'attachment')
      const documentArchive = await ApiDocuments.list(slug, 'client', 'archive')
      const departments = await ApiDepartments.list()
      const contacts = await ApiContacts.list()
      const jobs = await ApiJobs.list()
      const clinicStructureId = detail?.data?.clinic_structure?.id
      const priceSettingId = detail?.data?.price_setting?.id
      const priceConditions = await ApiPriceConditions.list(priceSettingId)
      await getClinicStructuresDetail(clinicStructureId)

      setClient(prev => ({...prev, 
        detail: detail.data,
        clientLoading: false,
        modelId: detail.data.id,
        attachments: documentAttachment.data || [],
        archives: documentArchive.data || [],
        temporaryAttachments: documentAttachment.data || [],
        temporaryArchives: documentArchive.data || [],
        departmentOption: departments.data,
        contactOption: contacts.data,
        priceSettingId,
        jobOption: jobs.data,
        priceConditions: priceConditions.data,
        notes: detail.data.price_setting.notes,
        vatNr: detail.data.price_setting.vat_nr,
        // attachments: attachment.data,
        // temporaryAttachments: attachment.data,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  // this slug comes from clinic structure Id
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
      }else if(priceSetting.includes(attr)){
        const formPriceSetting = new FormData()
        formPriceSetting.append(`price_setting[${snakeCaseAttr}]`, value);
        const dataBankPriceSetting = await ApiPriceSettings.update(client.priceSettingId, formPriceSetting)
        console.log(dataBankPriceSetting, 'dataBankPriceSetting')
      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleFile = (client, type) => (files) => {
    const newFiles = files.filter(any => (Validation.file(any.name) === ''))
    
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
      handleUploadFile(client, newFiles[total], theFile.uuid, type)
      const stateType = capitalizeFirstLetter(type)
      setClient(prev => ({...prev, [`temporary${stateType}s`]: prev[`temporary${stateType}s`].concat(theFile)}))
    }
  }

  const handleUploadProgress = (uuid, type) => (progress) => {
    const stateType = capitalizeFirstLetter(type)
    setClient(prev => ({
      ...prev,
      [`temporary${stateType}s`]: prev[`temporary${stateType}s`].map(a => {
        if(a.uuid === uuid){
          return{...a, progress}
        }
        return {...a}
      })
    }))
  }

  const handleDeleteFile = async(id, type) => {
    try {
      const {data} = await ApiDocuments.destroy(id)
      if (process.env.ENV_APP === 'development') {
        console.log(`${type === 'attachment' ? `attachment` : `archive`} successfully deleted`)
      }
      getClientsDetail(slug)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeletePriceCondition = async(id) => {
    try {
      const {data} = await ApiPriceConditions.destroy(id)
      if (process.env.ENV_APP === 'development') {
        console.log('price conditions successfully deleted')
        getClientsDetail(slug)
      }
    } catch (e) {
      console.log(e)      
    }
  }

  const handleUploadFile = async(client, file, uuid, uploadType) => {
    try {
      const objectToSend = ModelDocument.params({...client, file, uuid, uploadType})
      const {data} = await ApiDocuments.create(objectToSend, handleUploadProgress(uuid, uploadType))
      const stateType = capitalizeFirstLetter(uploadType)
      setClient(prev => 
        ({...prev,
          [`temporary${stateType}s`]: prev[`temporary${stateType}s`].map(a => {
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

  const submitCondition = async(client) => {
    try {
      const objToSend = ModelPriceCondition.params(client)
      const data = await ApiPriceConditions.create(objToSend)
      getClientsDetail(slug)
      console.log(data, 'success')
    } catch (e) {
      console.log(e)
    }
  }

  const updateCondition = async(priceConditionId, client) => {
    try {
      const objToSend = ModelPriceCondition.params(client)
      const data = await ApiPriceConditions.update(priceConditionId, objToSend)
      getClientsDetail(slug)
      console.log(data, 'success')
    } catch (e) {
      console.log(e)
    }
  }

  const confirmDeleteFile = (id, type) => () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text="Are you sure want to delete this file?"
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              handleDeleteFile(id, type);
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  };

  const confirmDeletePriceCondition = (id) => () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text="Are you sure want to delete this condition?"
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              handleDeletePriceCondition(id);
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  }

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

  if (process.env.ENV_APP === 'development') console.log(client, 'object state')

  return(
    <>
      <Wrapper>
        <Content>
          {
            Object.keys(client.detail).length > 0 &&
            <>
              <Profile detail={client.detail}/>
              <Box>
                <Tab>
                  {detailTabClient.map((a) => {
                    return <li key={a.slug}>
                      <Link
                        onClick={() => setClient(prev => ({...prev, activeTab: a.slug}))}
                        replace
                        to={`${location.pathname}?tab=${a.slug}`} 
                        className={`${a.slug === client.activeTab ? `active` : ``}`}>
                        {a.label}
                      </Link>
                    </li>
                  })}
                </Tab>
                
                {
                  client.activeTab === 'information' &&
                  (<Information
                    client={client}
                    setShowModalAttachment={setShowModalAttachment}
                    confirmDeleteFile={confirmDeleteFile}
                    readablizeBytes={readablizeBytes}
                  />)
                }

                {
                  client.activeTab === 'general' && 
                  (<General
                    client={client}
                    handleInput={handleInput}
                    handleInputSelect={handleInputSelect}
                  />)
                }
                
                {
                  client.activeTab === 'price-settings' && (
                    <PriceSetting>
                      <Subtitle>
                        <h4>Conditions</h4>
                        <div><span onClick={() => {
                          setShowModalCondition(true)
                        }}><b>+</b>
                        {/* New Condition */}
                        </span></div>
                      </Subtitle>
                      {
                        client.priceConditions.length > 0 &&
                        <Table style={{marginTop: '10px', marginBottom: '35px'}}>
                          <thead>
                            <tr>
                              <th scope="col">Job Position</th>
                              <th scope="col">Hourly Rate</th>
                              <th scope="col">Vat(%)</th>
                              <th scope="col">Z0(%)</th>
                              <th scope="col">Z1(%)</th>
                              <th scope="col">Z2(%)</th>
                              <th scope="col">Z3(%)</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              client.priceConditions.map((a) => {
                                return(
                                  <tr key={a.id}>
                                    <td scope="row"><span>{a.job.label}</span></td>
                                    <td>{a.hourly_rate}</td>
                                    <td>{a.vat}</td>
                                    <td>{a.percentage_zero}</td>
                                    <td>{a.percentage_one}</td>
                                    <td>{a.percentage_two}</td>
                                    <td>{a.percentage_three}</td>
                                    <td>
                                        <Action>
                                          <i onClick={() => {
                                            setShowModalCondition(true);
                                            setClient(prev => ({
                                                ...prev, 
                                                priceConditionId: a.id,
                                                job: a.job,
                                                hourlyRate: a.hourly_rate,
                                                vat: a.vat,
                                                percentageZero: a.percentage_zero,
                                                percentageOne: a.percentage_one,
                                                percentageTwo: a.percentage_two,
                                                percentageThree: a.percentage_three
                                            }));
                                          }} className="la la-edit"></i>
                                          <i onClick={confirmDeletePriceCondition(a.id)} className="la la-trash"></i>
                                        </Action>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <Customer>
                        <Subtitle>
                          <h4>Customer Notes</h4>
                        </Subtitle>
                        <Input
                          label={
                            (client.notesError === '' ? <label>Notes</label> :
                            <label className="error">{client.notesError}</label>)
                          }
                          placeholder="Notes"
                          value={client.notes}
                          error={client.notesError}
                          type="textarea"
                          onChange={handleInput('notes')}
                        />
                      </Customer>
                      <Notes>
                        <Subtitle>
                          <h4>Notes</h4>
                        </Subtitle>
                        <Input
                          label={
                            (client.vatNrError === '' ? <label>VAT-NR</label> :
                            <label className="error">{client.vatNrError}</label>)
                          }
                          placeholder="Notes"
                          value={client.vatNr}
                          error={client.vatNrError}
                          type="text"
                          onChange={handleInput('vatNr')}
                        />
                      </Notes>
                    </PriceSetting>
                  )
                }

                {
                  client.activeTab === 'documents' &&
                  <Documents>
                    <Subtitle>
                      <h4>Client Archive</h4>
                      <div><span onClick={() => {
                        setShowModalArchives(true)
                      }}><b>+</b>
                      </span></div>
                    </Subtitle>
                    {
                      client.archives.length > 0 &&
                      <Table style={{marginTop: '10px'}}>
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Extension</th>
                            <th scope="col">Size</th>
                            <th scope="col">Last Changed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            client.archives.map((a) => {
                              return(
                                <tr key={a.id}>
                                  <td scope="row">
                                    <span>
                                      {a.name}
                                    </span>
                                  </td>
                                  <td>{a.extension}</td>
                                  <td>{readablizeBytes(a.size)}</td>
                                  <td>{a.updated_at.split('T')[0]}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    }
                  </Documents>
                }
              </Box>
            </>
          }
        </Content>
      </Wrapper>

      <Modal 
        show={showModalCondition}
        onClose={() => {
          setShowModalCondition(false);
          setClient(prev => ({...prev, priceConditionId: ''}));
        }}
        width={`500px`}
        height={`auto`}>
          <Condition>
            <Subtitle style={{marginBottom: '15px'}}>
              <h4>Add condition</h4>
            </Subtitle>
            <Select
              label={
                (client.jobError === '' ? <label>Job Position</label> :
                <label className="error">{client.jobError}</label>)
              }
              options={client.jobOption}
              value={client.job}
              error={client.jobError}
              onChange={handleInputSelect('job')}
            />
            <Input
              label={
                (client.hourlyRateError === '' ? <label>Hourly Rate</label> :
                <label className="error">{client.hourlyRateError}</label>)
              }
              placeholder="Hourly Rate"
              value={client.hourlyRate}
              error={client.hourlyRateError}
              onChange={handleInput('hourlyRate')}
            />
            <Input
              label={
                (client.vatError === '' ? <label>Vat</label> :
                <label className="error">{client.vatError}</label>)
              }
              placeholder="Vat"
              value={client.vat}
              error={client.vatError}
              onChange={handleInput('vat')}
            />
            <Percentage>
              <Input
                label={
                  (client.percentageZeroError === '' ? <label>Z0</label> :
                  <label className="error">{client.percentageZeroError}</label>)
                }
                placeholder="Z0"
                value={client.percentageZero}
                error={client.percentageZeroError}
                onChange={handleInput('percentageZero')}
              />
              <Input
                label={
                  (client.percentageOneError === '' ? <label>Z1</label> :
                  <label className="error">{client.percentageOneError}</label>)
                }
                placeholder="Z1"
                value={client.percentageOne}
                error={client.percentageOneError}
                onChange={handleInput('percentageOne')}
              />
            </Percentage>
            <Percentage>
              <Input
                label={
                  (client.percentageTwoError === '' ? <label>Z2</label> :
                  <label className="error">{client.percentageTwoError}</label>)
                }
                placeholder="Z2"
                value={client.percentageTwo}
                error={client.percentageTwoError}
                onChange={handleInput('percentageTwo')}
              />
              <Input
                label={
                  (client.percentageThreeError === '' ? <label>Z3</label> :
                  <label className="error">{client.percentageThreeError}</label>)
                }
                placeholder="Z3"
                value={client.percentageThree}
                error={client.percentageThreeError}
                onChange={handleInput('percentageThree')}
              />
            </Percentage>
            <Button
              onClick={() => {
                if(client.priceConditionId !== ''){
                  updateCondition(client.priceConditionId, client)
                }else{
                  submitCondition(client)
                }
              }}
              color={activeColor}
              background={activeBackground}
              borderColor={activeBackground}>
                {
                  client.priceConditionId !== '' ?
                  <b>Update condition</b>
                  :
                  <b>Add condition</b>
                }
            </Button>
          </Condition>
      </Modal>

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
            client.temporaryAttachments.length > 0 &&
            <ul>
              {client.temporaryAttachments.map((a, index) => {
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
                        <i onClick={confirmDeleteFile(a.id, 'attachment')}>x</i>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(client, 'attachment')} id="dropzone-preview">
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
            loading={client.formFileLoading}
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Attachment>
      </Modal>

      {/* Modal document */}
      <Modal 
        show={showModalArchives}
        onClose={() => {
          setShowModalArchives(false)
        }}
        width={`400px`} 
        height={`auto`}>
        <Archives>
          <h4>Documents</h4>
          {
            client.temporaryArchives.length > 0 &&
            <ul>
              {client.temporaryArchives.map((a, index) => {
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
                        <i onClick={confirmDeleteFile(a.id, 'archive')}>x</i>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(client, 'archive')} id="dropzone-preview">
            <span>Pilih file</span>
          </Dropzone>
          <Button
            onClick={() => {
              setShowModalArchives(false)
              getClientsDetail(slug)
            }}
            color={activeColor}
            background={activeBackground}
            customLoading={true}
            loadingChildren={
              <span>10%</span>
            }
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Archives>
      </Modal>
    </>

  )
})

export default Detail