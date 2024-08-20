"use client"
import { getUsers } from "@/lib/getUsers"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <main>
      {data?.map((item) => (
        <div key={item.address.geo.lat}>{item.company.name}</div>
      ))}
    </main>
  )
}
