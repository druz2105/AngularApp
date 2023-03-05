export class UserRegister {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword?: string;


  constructor(firstName?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || '';
    this.confirmPassword = confirmPassword || '';
  }

}


export class UserLogin {

  public email: string;
  public password: string;


  constructor(email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
  }

}
