export interface LoginAPIResponse {
  access: string;
  refresh: string;
  userId: string;
}


export interface UserDetail {
  "id": number
  "email": string,
  "firstName": string,
  "lastName": string,
  "lastLogin": Date | null
}
