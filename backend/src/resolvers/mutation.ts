import { UserNeed } from "../entity/UserNeed"
import { getConnection } from '../db'


const mutationResolvers = {
  addUserNeed: async (_: any, { name, description }) => {
    const conn = await getConnection()
    const userNeed = new UserNeed()
    userNeed.name = name
    userNeed.description = description
    console.log('✔️ User need created')
    return await conn.manager.save(userNeed)
  },
  deleteUserNeed: async (_: any, { id }) => {
    const conn = await getConnection()
    const userNeedRepo = conn.getRepository(UserNeed)
    const userNeed = await conn.manager.findOne(UserNeed, id)
    await userNeedRepo.remove([userNeed])
    return id
  }

}

export default mutationResolvers