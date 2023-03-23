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


export class UserDetail {
  public id: string | number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public lastLogin: Date | null;

  constructor(id?: string | number, email?: string, firstName?: string, lastName?: string, lastLogin?: Date | null) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.lastLogin = lastLogin || new Date();
  }
}


export class UserPasswordChange {
  public oldPassword: string;
  public password: string;

  public confirmPassword?: string;

  constructor(oldPassword?: string, password?: string, confirmPassword?: string) {
    this.oldPassword = oldPassword || '';
    this.password = password || '';
    this.confirmPassword = confirmPassword || '';
  }
}
