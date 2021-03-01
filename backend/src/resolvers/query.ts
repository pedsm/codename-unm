import { UserNeed } from "../entity/UserNeed"
import { getConnection } from '../db'


const queryResolver = {
  userNeeds: async () => {
    const conn = await getConnection()
    return await conn.manager.find(UserNeed)
  },
  userNeed: async (_: any, { id }) => {
    const conn = await getConnection()
    return await conn.manager.findOne(UserNeed, id)
  }

}

export default queryResolver