import { UserEntity } from "../entity/user.entity";

export const userEntityMock: UserEntity = {
  id: 4,
  name: 'Jefferson Martins',
  email: 'Jeff@jeff.com.br',
  password: '12345',
  created_at: new Date(),
  updated_at: new Date(),
}