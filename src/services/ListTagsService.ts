import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"


class ListTagsService {
  async execute() {
    const tagsRepositorires = getCustomRepository(TagsRepositories)

    const tags = await tagsRepositorires.find()

    return classToPlain(tags)
  }
}

export { ListTagsService }