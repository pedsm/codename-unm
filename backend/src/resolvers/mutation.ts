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
  updateNeedStatus: async (_: any, { id, newStatus }) => {
    const conn = await getConnection()
    const userNeed = await conn.manager.findOne(UserNeed, id)
    userNeed.status = newStatus;
    return await conn.manager.save(userNeed)
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
  },
  editStakeholder: async (_: any, { id, name, description }) => {
    const conn = await getConnection()
    const stakeholder = await conn.manager.findOne(Stakeholder, id)
    stakeholder.name = name
    stakeholder.description = description
    return await conn.manager.save(stakeholder)
  }

}

export default mutationResolvers