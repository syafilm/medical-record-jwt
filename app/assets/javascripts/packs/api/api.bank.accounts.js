import {base} from './api.base'

function detail(id){
  return base().get(`bank_accounts/${id}/detail`)
}

function update(id, data){
  return base().put(`bank_accounts/${id}/update`, data)
}

const BankAccounts = {
  detail,
  update
}

export default BankAccounts
