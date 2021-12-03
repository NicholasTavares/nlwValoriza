import { getCustomRepository } from "typeorm"
import {ComplimentsRespositories} from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {

  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest) {
    const complimentsRespositories = getCustomRepository(ComplimentsRespositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver")
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if(!userReceiverExists) {
      throw new Error("User Receiver does not exists!")
    }

    const compliment = complimentsRespositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRespositories.save(compliment)
  }

}

export {CreateComplimentService}