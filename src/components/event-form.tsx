"use client"

import { useState, useEffect } from "react"
import { EditorState } from "draft-js"
import dynamic from "next/dynamic"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"

const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
})

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

interface EventFormProps {
  initialDate?: Date
}

export function EventForm({ initialDate }: EventFormProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate || new Date())
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  //const isClient = useIsClient()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add logic to send data to backend
    console.log("New Event Submitted:", {
      date,
      title,
      body: editorState,
    })
  }

  //if (!isClient) return null

  return (
    <div className="flex justify-center items-start py-10">
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      {/* Date Picker */}
      <div className="flex flex-col space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
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
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter event title"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col space-y-2">
        <Label>Body</Label>
        <div className="border border-gray-300 rounded-md p-2 bg-white">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="demo-wrapper"
            editorClassName="min-h-[150px] px-3 py-2"
            toolbar={{
              options: ["inline", "blockType", "fontSize", "list", "textAlign", "history"],
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-black text-white">Save Event</Button>
      </div>
    </form>
    </div> 
  )
}
