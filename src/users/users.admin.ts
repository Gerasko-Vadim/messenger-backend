import { AdminEntity } from 'nestjs-admin'
import { Users } from './schemas/users.schema'


export class UserAdmin extends AdminEntity {
  entity = Users
  listDisplay = ['name', 'surname']
}