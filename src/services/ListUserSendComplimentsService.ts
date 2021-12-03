import { getCustomRepository } from "typeorm"
import { ComplimentsRespositories } from "../repositories/ComplimentsRepositories"


class ListUserSendComplimentsService {
  async execute(user_id: string){
    const complimentsRepositories = getCustomRepository(ComplimentsRespositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    })

    return compliments
  }
}

export { ListUserSendComplimentsService }