export interface LoginAPIResponse {
  access: string;
  refresh: string;
  firstName: string;
  lastName: string;
}


export interface GetUserDetailAPIResponse {
  "id": number
  "email": string,
  "firstName": string,
  "lastName": string,
  "lastLogin": Date | null
  "image": string
}
