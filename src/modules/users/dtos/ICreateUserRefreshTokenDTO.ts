interface ICreateUserRefreshTokenDTO {
  user_id: string;
  expire_date: Date;
  refresh_token: string;
}

export { ICreateUserRefreshTokenDTO };
