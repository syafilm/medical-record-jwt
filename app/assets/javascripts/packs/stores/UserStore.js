import { action, computed, observable, makeObservable } from 'mobx'
import { ModelStaff, ModelSuperadmin } from 'models'
import { ApiRegisters, ApiSessions } from 'api'
import { cookies } from 'configs'

class UserStore {
  constructor(store) {
    this.store = store
    makeObservable(this);
  }

  @observable user = {
    authenticated: false,
    loading: true,
    loadingForm: false,
    detail: {

    },
    activeColor: '',
    activeBackground: '',
    role: '',
    notification: false,
    state: 'initial'
  }


  @action
    handleActiveBackgroundColor = (data = {}) => {
      this.user.activeColor = data.color
      this.user.activeBackground = data.background
      localStorage.setItem("dataColor", JSON.stringify(data))
    }

  @action
    handleNotification = (value) => {
      this.user.notification = value
    }
  
  @action
    handleSetRole = (type) => {
      this.user.role = type
      localStorage.setItem("role", JSON.stringify({role: type}))
   }
  
  @action
    handleSetUser = (detail) => {
      this.user.loading = false
      if(Object.keys(detail).length > 0){
        this.user.detail = detail
        this.user.authenticated = true
      }
    }

  @action
    createRegister = async(register) => {
      let objectToSend = {}
      if(this.user.role === 'staff'){
        objectToSend = ModelStaff.params(register)
      }else if(this.user.role === 'superadmin'){
        objectToSend = ModelSuperadmin.params(register)
      }

      try {
        const {data} = await ApiRegisters.create(objectToSend)
        console.log(data, 'success')
      } catch (e) {
        console.log(e)
      }
    }

  @action
    createSession = async(login) => {
      this.user.loadingForm = true
      this.user.state = 'loading'
      this.sendSession(login)
        .then(action("sendSuccess", data => {
            cookies.setAccessToken(data);
            this.user.state = 'success'
            this.user.authenticated = true
            this.user.loadingForm = false
        }))
        .catch(action("sendFailed", e => {
          this.user.state = 'failed'
          this.user.loadingForm = false
          console.error(e);
        }));
    }

    sendSession = (login) => {
      let objectToSend = {}
      if(this.user.role === 'staff'){
        objectToSend = ModelStaff.params(login)
      }else if(this.user.role === 'superadmin'){
        objectToSend = ModelSuperadmin.params(login)
      }

      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await ApiSessions.create(objectToSend)
          resolve(data)
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    }
}

export default UserStore