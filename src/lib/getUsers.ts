import { Users } from "@/types/User"
import axios from "axios"
export const getUsers = async (): Promise<Users> => {
  try {
    const response = await axios.get<Users>(
      `${process.env.NEXT_PUBLIC_API_KEY}/users`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}
