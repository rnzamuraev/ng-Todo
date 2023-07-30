import { Observable } from 'rxjs'

import { ICommonDao } from "./common-dao.interface";
import { ICategory } from 'src/app/shared/types/category.interface'

export interface ICategoryDao extends ICommonDao<ICategory> {
  search(): Observable<ICategory>
}
