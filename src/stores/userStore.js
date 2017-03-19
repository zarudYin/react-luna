import { observable } from 'mobx';

const Head = require('Assets/img/user-photo.png');

class User {
  @observable isLogin = false

  @observable token = ''

  @observable name = 'zarud'

  @observable phone = '186****8888'

  @observable head = Head
}

export default User;