import { UserNeed } from "../entity/UserNeed"
import { Stakeholder } from "../entity/Stakeholder"
import { getConnection } from '../db'


const queryResolver = {
  userNeeds: async () => {
    const conn = await getConnection()
    return await conn.manager.find(UserNeed, { relations: ['stakeholder'] })
  },
  userNeed: async (_: any, { id }) => {
    const conn = await getConnection()
    const userNeed = await conn.manager.findOne(UserNeed, id, { relations: ['stakeholder'] })
    return userNeed
  },
  stakeholders: async () => {
    const conn = await getConnection()
    return await conn.manager.find(Stakeholder)
  },
  stakeholder: async (_: any, { id }) => {
    const conn = await getConnection()
    const stakeholder = await conn.manager.findOne(Stakeholder, id, {
      relations: ['userNeeds']
    })
    console.log(stakeholder)
    return stakeholder
  }
}

export default queryResolver