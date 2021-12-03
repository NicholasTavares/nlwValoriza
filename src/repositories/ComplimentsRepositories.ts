import {Repository, EntityRepository} from "typeorm"
import { Compliments } from "../entities/Compliments";

@EntityRepository(Compliments)
class ComplimentsRespositories extends Repository<Compliments> {

}

export {ComplimentsRespositories}