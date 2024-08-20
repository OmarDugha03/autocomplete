"use client"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
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
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const filteredData = data?.filter((item) =>
    item.company.name.toLowerCase().includes(debouncedValue.toLowerCase())
  )
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const currentPageData = filteredData?.slice(startIdx, endIdx)

  function handleDebounce(e: any) {
    setValue(e.target.value)
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  function handleAutoComplete(e: any) {
    const selectedCompanyName = e.target.textContent
    setValue(selectedCompanyName)
  }

  return (
    <main className="mx-4 mt-4 lg:w-[40%] ">
      <div className="flex items-center justify-between relative">
        <Label htmlFor="com">Company Name</Label>
        <ThemeToggle />
      </div>
      <Input
        id="com"
        placeholder="please and any value"
        value={value}
        onChange={handleDebounce}
        className="mt-3 "
      />
      <section className="mt-4">
        {currentPageData?.map((item) => (
          <p
            onClick={handleAutoComplete}
            key={item.id}
            className="my-4 rounded-lg p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-50 dark:hover:text-black transition-all duration-300">
            {item.company.name.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  word.toLowerCase().includes(debouncedValue) &&
                  debouncedValue !== ""
                    ? "bg-yellow-500"
                    : ""
                }>
                {word}
              </span>
            ))}
          </p>
        ))}
      </section>
      <section className="space-x-4 absolute bottom-12">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="transition-all duration-300">
          Previous
        </Button>
        <Button
          className="transition-all duration-300"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIdx >= (filteredData?.length || 0)}>
          Next
        </Button>
      </section>
    </main>
  )
}
