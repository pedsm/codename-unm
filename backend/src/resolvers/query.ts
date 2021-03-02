import { UserNeed } from "../entity/UserNeed"
import { Stakeholder } from "../entity/Stakeholder"
import { getConnection } from '../db'


const queryResolver = {
  userNeeds: async () => {
    const conn = await getConnection()
    return await conn.manager.find(UserNeed)
  },
  userNeed: async (_: any, { id }) => {
    const conn = await getConnection()
    const userNeed = await conn.manager.findOne(UserNeed, id)
    console.log(userNeed.stakeholder)
    return userNeed
  },
  stakeholders: async () => {
    const conn = await getConnection()
    return await conn.manager.find(Stakeholder)
  },
  stakeholder: async (_: any, { id }) => {
    const conn = await getConnection()
    return await conn.manager.findOne(Stakeholder, id)
  },


}

export default queryResolver