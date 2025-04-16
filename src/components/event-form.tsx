'use client'

import { useState, useRef } from "react"
import EditorComponent from "@/components/wyswyg-editor/editor-component";
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import "@/components/wyswyg-editor/index.css";
import { EditorState } from "lexical";
import { redirect } from "next/navigation";
import { createEvent } from "@/db/db-actions-events";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";


export function EventForm() {
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date())
  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const editorStateRef = useRef<EditorState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    
    const dateParam = searchParams.get("date");

    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setEventDate(parsedDate);
      }
    }
  }, []);

  const handleEventDateChange = (date: Date | undefined) => {
    const utcDate = date ? new Date( Date.UTC(date.getFullYear(),date.getMonth(), date.getDate()) ) : undefined;
    console.log("utcDate", utcDate);
    setEventDate(utcDate); // Set the state with the UTC date

    //setEventDate(date); 
  }

  const handleEditorStateChange = (editorState: EditorState) => {
    editorStateRef.current = editorState;
  }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      setErrorMessage(null);
  
      setIsSaving(true);

      const response = await createEvent({
        title,
        description: editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null,
        shortdescription: shortDescription,  
        eventDate : eventDate || new Date(),     
        adminId: "test"
    });

      setIsSaving(false);
  
      if (response.error) {
        setErrorMessage(response.error);
        return;
      }
  
      redirect("/events/" + response.message?.id);
    }
  

  return (
    <div className="flex justify-center items-start py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-max space-y-6">
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        {/* Date Picker */}
        <div className="flex flex-col space-y-2">
          <Label>Event Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !eventDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={eventDate} onSelect={handleEventDateChange} initialFocus />
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

        {/* Short Description */}
        <div className="flex flex-col space-y-2">
          <Label>Short Description</Label>
          <Input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter a short description"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col space-y-2">
          <Label>Body</Label>
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            <EditorComponent
              className="border rounded-lg p-2"
              onChangeCallback={handleEditorStateChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="bg-black text-white">
            {isSaving ? "Saving Event..." : "Save Event"}
          </Button>
        </div>
      </form>
    </div>
  )
}