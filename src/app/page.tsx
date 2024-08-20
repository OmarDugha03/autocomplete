"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUsers } from "@/lib/getUsers"
import useAutocompleteStore from "@/lib/store"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useState } from "react"
import { useDebounce } from "use-debounce"

export default function Home() {
  /* Hooks  */
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  })
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const { setInputValue } = useAutocompleteStore()

  const filteredData = data?.filter((item) =>
    item.company.name.toLowerCase().includes(debouncedValue.toLowerCase())
  )
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const currentPageData = filteredData?.slice(startIdx, endIdx)

  /* req handling */
  function handleDebounce(e: any) {
    setValue(e.target.value)
    setInputValue(e.target.value)
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
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

      {/*  Fetching the Data */}
      <section className="mt-4">
        {currentPageData?.map((item) => (
          <p
            key={item.id}
            className={clsx(
              item.company.name
                .replace(/\s/g, "")
                .toLowerCase()
                .includes(debouncedValue.replace(/\s/g, "")) && value !== ""
                ? "bg-yellow-500"
                : "",
              "my-4 rounded-lg p-4 hover:bg-gray-200 transition-all duration-300"
            )}>
            {item.company.name}
          </p>
        ))}
      </section>
      <section className="space-x-4">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIdx >= (filteredData?.length || 0)}>
          Next
        </Button>
      </section>
    </main>
  )
}
