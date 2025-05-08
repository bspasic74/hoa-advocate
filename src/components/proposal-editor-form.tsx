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

import { cn, prepareDatabaseDateForDisplay, prepareDateForDatabase } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import EditorComponent from "./wyswyg-editor/editor-component"
import { TimePickerDemo } from "./ui/time-picker-demo"
import { createProposal, updateProposal } from "@/db/db-actions-proposals"
import "@/components/wyswyg-editor/index.css"
import { EditorState } from "lexical"
import { proposals } from "@/schema"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string().optional(),
})

export function ProposalEditorForm({ initialData }: { initialData?: typeof proposals.$inferSelect }) {
  const isClient = useIsClient();
  const editorStateRef = useRef<EditorState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Check if this is a new proposal or an existing one that can be edited
  const isNewProposal = !initialData;
  const canEditProposal = isNewProposal || initialData?.status === "pending" || initialData?.status === "canceled";
  
  // If it's an existing proposal that can't be edited, show message and return
  if (!isNewProposal && !canEditProposal) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-l font-semibold mb-2">Editing Not Available</p>
        <p>This proposal is either finished or active so editing is not possible.</p>
      </div>
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      shortDescription: initialData?.shortdescription ?? "",
      startDate: initialData?.startdate ? prepareDatabaseDateForDisplay(initialData.startdate) : new Date(),
      endDate: initialData?.enddate ? prepareDatabaseDateForDisplay(initialData.enddate) : new Date(),
      status: initialData?.status ?? "pending",
    },
  });

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
      startDate: prepareDateForDatabase(values.startDate),
      endDate: prepareDateForDatabase(values.endDate),
      body: bodyData,
      status: values.status || "pending",
    }

    const res = initialData?.id
      ? await updateProposal({ id: initialData.id, ...payload })
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
        
        {/* Form header based on whether it's new or edit */}
        <h2 className="text-xl font-semibold">
          {isNewProposal ? "Create New Proposal" : "Edit Proposal"}
        </h2>

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
              content={initialData?.description ?? undefined}
              onChangeCallback={(editorState) => (editorStateRef.current = editorState)}
            />
          </div>
        </div>

        {/* Only show status field for existing editable proposals */}
        {!isNewProposal && canEditProposal && (
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

        <div className="flex justify-center">
          <Button type="submit" disabled={isSaving} className="button-dark-blue text-white">
            {isSaving ? "Saving..." : isNewProposal ? "Create Proposal" : "Update Proposal"}
          </Button>
        </div>
      </form>
    </Form>
  )
}