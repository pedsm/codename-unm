import { UserNeed } from "../entity/UserNeed"
import { getConnection } from '../db'
import { Stakeholder } from "../entity/Stakeholder"


const mutationResolvers = {
  addUserNeed: async (_: any, { name, description, stakeholderId }) => {
    const conn = await getConnection()
    const userNeed = new UserNeed()
    userNeed.name = name
    userNeed.description = description
    userNeed.stakeholder = await conn.manager.findOne(Stakeholder, stakeholderId)
    console.log('✔️ User need created')
    return await conn.manager.save(userNeed)
  },
  deleteUserNeed: async (_: any, { id }) => {
    const conn = await getConnection()
    const userNeedRepo = conn.getRepository(UserNeed)
    const userNeed = await conn.manager.findOne(UserNeed, id)
    await userNeedRepo.remove([userNeed])
    return id
  },
  addStakeholder: async (_: any, { name, description }) => {
    const conn = await getConnection()
    const stakeholder = new Stakeholder()
    stakeholder.name = name
    stakeholder.description = description
    console.log('✔️ Stakeholder created')
    return await conn.manager.save(stakeholder)
  },
  deleteStakeholder: async (_: any, { id }) => {
    const conn = await getConnection()
    const stakeholderRepo = conn.getRepository(Stakeholder)
    const stakeholder = await conn.manager.findOne(Stakeholder, id)
    await stakeholderRepo.remove([stakeholder])
    return id
  }

}

export default mutationResolvers