import { observable } from 'mobx';

class User {
  @observable isLogin = false

  @observable token = ''

  @observable name = 'zarud'

  @observable phone = '186****8888'
}

export default User;