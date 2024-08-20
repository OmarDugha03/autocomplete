"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUsers } from "@/lib/getUsers"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebounce } from "use-debounce"
export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const [value, setValue] = useState()
  const [debouncedValue] = useDebounce(value, 1000)
  function handleDebounce(e: any) {
    setValue(e.target.value)
  }
  return (
    <main className="mx-4 mt-4 lg:w-[40%]">
      <Label htmlFor="com">Company Name</Label>
      <Input
        id="com"
        placeholder="please and any value"
        value={value}
        onChange={handleDebounce}
        className="mt-3 "
      />

      {/* Testing the Debounce :     
        <p>Actual value: {value}</p>
      <p>Debounce value: {debouncedValue}</p> */}

      {/* Fetching the Data
          {data?.map((item) => (
        <div key={item.address.geo.lat}>{item.company.name}</div>
      ))} */}
    </main>
  )
}
