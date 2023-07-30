import { ICommonDao } from "./common-dao.interface";
import { IPriority } from 'src/app/shared/types/priority.interface'

export interface IPriorityDao extends ICommonDao<IPriority> {
}
