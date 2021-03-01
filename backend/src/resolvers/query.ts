import { UserNeed } from "../entity/UserNeed"
import { getConnection } from '../db'


const queryResolver = {
  userNeeds: async () => {
    const conn = await getConnection()
    return await conn.manager.find(UserNeed)
  }

}

export default queryResolver