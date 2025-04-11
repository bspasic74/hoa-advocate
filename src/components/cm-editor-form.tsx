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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsClient } from "@/hooks/use-is-client"

// Dinamički import Editor komponente bez SSR-a
const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
})

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export function CMEditorForm() {
  const isClient = useIsClient()

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [type, setType] = useState("Notification")
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState<EditorState | null>(null)

  useEffect(() => {
    if (isClient) {
      setEditorState(EditorState.createEmpty())
    }
  }, [isClient])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submit:", { date, type, title, editorState })
  }

  if (!isClient || editorState === null) return null

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

      {/* Type */}
      <div className="flex flex-col space-y-2">
        <Label>Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Notification">Notification</SelectItem>
            <SelectItem value="Proposed Change">Proposed Change</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
            <SelectItem value="Meeting Notes">Meeting Notes</SelectItem>
          </SelectContent>
        </Select>
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
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="demo-wrapper"
            editorClassName="min-h-[150px] px-3 py-2"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-black text-white">Submit</Button>
      </div>
    </form>
  )
}