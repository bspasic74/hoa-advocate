'use client'

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn, prepareDatabaseDateForDisplay, prepareDateForDatabase } from "@/lib/utils"
import { format } from "date-fns"
import EditorComponent from "@/components/wyswyg-editor/editor-component"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createEvent, updateEvent } from "@/db/db-actions-events"
import { EditorState } from "lexical"

import "@/components/wyswyg-editor/index.css"

const eventSchema = z.object({
  eventDate: z.date(),
  title: z.string().min(1, "Title is required"),
  shortdescription: z.string().min(1, "Short description is required")
})

type EventFormSchema = z.infer<typeof eventSchema>

interface EventFormProps {
  initialData?: {
    id: number;
    eventDate?: Date;
    title: string;
    shortdescription: string;
    description: string | null;
  };
  onSubmit?: (data: any) => Promise<void>;
}

export function EventForm({ initialData, onSubmit }: EventFormProps) {
  const [editorState, setEditorState] = useState<EditorState | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<EventFormSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventDate: initialData?.eventDate ? prepareDatabaseDateForDisplay(initialData.eventDate) : new Date(),
      title: initialData?.title || "",
      shortdescription: initialData?.shortdescription || ""
    }
  })

  useEffect(() => {
    const dateParam = searchParams.get("date")
    if (dateParam) {
      const parsedDate = new Date(dateParam)
      if (!isNaN(parsedDate.getTime())) {
        form.setValue("eventDate", parsedDate)
      }
    }
  }, [searchParams, form])

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const onFormSubmit = async (values: EventFormSchema) => {
    setErrorMessage(null)
    setIsSaving(true)

    const payload = {
      eventDate: prepareDateForDatabase(values.eventDate),
      title: values.title,
      shortdescription: values.shortdescription,
      description: editorState ? JSON.stringify(editorState.toJSON()) : null,
    }

    try {
      const response = initialData?.id
        ? await updateEvent(initialData.id, payload)
        : await createEvent(payload)

      setIsSaving(false)

      if (response.error) {
        setErrorMessage(response.error)
        return
      }

      if (onSubmit) {
        await onSubmit(response)
      } else {
        router.push(`/events/${response.message?.id}`)
      }
    } catch (err) {
      setIsSaving(false)
      setErrorMessage("An error occurred while saving")
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-start py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="form-container max-w-max space-y-6">
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortdescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a short description" {...field} className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-2">
            <Label>Body</Label>
            <div className="border border-gray-300 rounded-md p-2 bg-white">
              <EditorComponent
                className="border rounded-lg p-2"
                content={initialData?.description || undefined}
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
      </Form>
    </div>
  )
}