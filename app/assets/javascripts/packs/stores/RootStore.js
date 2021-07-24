import { action, computed, observable } from 'mobx'
import {UserStore} from 'stores'

class RootStore {
  user = new UserStore(this)
}

export default RootStore