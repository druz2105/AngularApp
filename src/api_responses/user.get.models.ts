export interface LoginAPIResponse {
  access: string;
  refresh: string;
  userId: string;
  firstName: string;
  lastName: string;
}


export interface GetUserDetailAPIResponse {
  "id": number
  "email": string,
  "firstName": string,
  "lastName": string,
  "lastLogin": Date | null
}
