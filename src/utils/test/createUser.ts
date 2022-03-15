import { hash } from 'bcrypt';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

export async function createUser(
  userDTO: ICreateUserDTO,
  connection: Connection
): Promise<User> {
  const password_hash = await hash(userDTO.password, 8);

  const user = new User();

  Object.assign(user, { ...userDTO });

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, balance)
      values('${user.id}', '${userDTO.name}', '${userDTO.email}', '${password_hash}', 'false', 'now()', '1000')
    `
  );

  return user;
}
