"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import EditorComponent from "./wyswyg-editor/editor-component"


export function ProposalEditorForm() {
  const isClient = useIsClient()

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [type, setType] = useState("Notification")
  const [title, setTitle] = useState("")
  

  useEffect(() => {
    if (isClient) {
      
    }
  }, [isClient])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    

    //TODO

  }

  if (!isClient) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date */}
      <div className="flex flex-col space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date instanceof Date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Title */}
      <div className="flex flex-col space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Body */}
      <div className="flex flex-col space-y-2">
        <Label>Body</Label>
        <div className="border border-gray-300 rounded-md p-2 bg-white">
          <EditorComponent />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-black text-white">Submit</Button>
      </div>
    </form>
  )
}