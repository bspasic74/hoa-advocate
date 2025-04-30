"use client"

import { useState, useEffect, useRef } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import EditorComponent from "./wyswyg-editor/editor-component"
import { TimePickerDemo } from "./ui/time-picker-demo"
import { createProposal, getProposalById, updateProposal } from "@/db/db-actions-proposals"
import "@/components/wyswyg-editor/index.css"
import { EditorState } from "lexical"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string().optional(),
})

export function ProposalEditorForm({ proposalId }: { proposalId?: number }) {
  const isClient = useIsClient()
  const editorStateRef = useRef<EditorState | null>(null)

  const [body, setBody] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "pending",
    },
  })

  useEffect(() => {
    const fetchProposal = async () => {
      if (proposalId) {
        const data = await getProposalById(proposalId)
        if (data) {
          form.setValue("title", data.title || "")
          form.setValue("shortDescription", data.shortdescription || "")
          form.setValue("startDate", data.startdate ? new Date(data.startdate) : new Date())
          form.setValue("endDate", data.enddate ? new Date(data.enddate) : new Date())
          form.setValue("status", data.status || "pending")
          setBody(data.description || null)
        }
      }
    }
    fetchProposal()
  }, [proposalId])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true)
    setErrorMessage(null)

    if (values.startDate >= values.endDate) {
      setErrorMessage("Start date must be before end date")
      setIsSaving(false)
      return
    }

    const bodyData = editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null

    const payload = {
      title: values.title,
      shortdescription: values.shortDescription,
      startDate: values.startDate,
      endDate: values.endDate,
      body: bodyData,
      status: values.status || "pending",
    }

    const res = proposalId
      ? await updateProposal({ id: proposalId, ...payload })
      : await createProposal(payload)

    setIsSaving(false)

    if (res.error) {
      setErrorMessage(res.error)
      return
    }

    if (res.message?.id) {
      window.location.href = `/proposals/${res.message.id}`
    }
  }

  if (!isClient) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="form-container max-w-max space-y-6">
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voting Start</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPPp") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo setDate={(d) => d && field.onChange(new Date(field.value.setHours(d.getHours(), d.getMinutes())))} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voting End</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPPp") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo setDate={(d) => d && field.onChange(new Date(field.value.setHours(d.getHours(), d.getMinutes())))} date={field.value} />
                  </div>
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
                <Input placeholder="Enter a title"  {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a short description"  {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <FormLabel>Body</FormLabel>
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            <EditorComponent
              className="border rounded-lg p-2 bg-[#f4f4fc]" 
              content={body ?? undefined}
              onChangeCallback={(editorState) => (editorStateRef.current = editorState)}
            />
          </div>
        </div>

        {proposalId && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#f4f4fc]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="bg-black text-white">
            {isSaving ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}