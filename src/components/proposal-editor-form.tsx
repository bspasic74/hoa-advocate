"use client"

import { useState, useEffect, useRef } from "react"
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
import { TimePickerDemo } from "./ui/time-picker-demo"
import { createProposal, getProposalById, updateProposal } from "@/db/db-actions-proposals"
import "@/components/wyswyg-editor/index.css";
import { set } from "lodash"
import { EditorState } from "lexical"
import {   Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from "./ui/select"



export function ProposalEditorForm({proposalId}: { proposalId?: number }) {
  const isClient = useIsClient()

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState("pending");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [body, setBody] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const editorStateRef = useRef<EditorState | null>(null);

  const handleEditorStateChange = (editorState: EditorState) => {
    editorStateRef.current = editorState;
  }

  useEffect(() => {
    const getProposal = async () => {
      
    if (proposalId){

      const existingProposal = await getProposalById(proposalId);

      if (existingProposal) {
        setStartDate(existingProposal.startdate ? new Date(existingProposal.startdate) : undefined);
        setEndDate(existingProposal.enddate ? new Date(existingProposal.enddate) : undefined);
        setTitle(existingProposal.title || "");
        setShortDescription(existingProposal.shortdescription || "");
        setBody(existingProposal.description || null);
        setStatus(existingProposal.status || "pending");
      }
    }
  }
    getProposal();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSaving(true);
    setErrorMessage(null);
    if (!startDate || !endDate) {
      setErrorMessage("Please select a start and end date");
      return;
    }
    if (startDate >= endDate) {
      setErrorMessage("Start date must be before end date");
      return;
    }
    if (!title) {
      setErrorMessage("Please enter a title");
      return;
    }
    if (!shortDescription) {
      setErrorMessage("Please enter a short description");
      return;
    }

    let res: {success: boolean; error?:string; message?: {id?:number}};
    if (proposalId){
      res = await updateProposal({
        id: proposalId,
        title,
        shortdescription: shortDescription,
        body: editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null,
        startDate: startDate,
        endDate: endDate,
        status,
      })

    } else {
      res = await createProposal({
        title,
        shortdescription: shortDescription,
        body: editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null,
        startDate: startDate,
        endDate: endDate,
        status,
      })
    }

    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
      return;
    }

    if (res.message?.id) {
      window.location.href = `/proposals/${res.message.id}`;
    }

  }
  
  const handleStartDateChange = (date: Date | undefined) => {
    const oldDate = startDate || new Date();
    const newStartDate = new Date(date?.getFullYear() || oldDate.getFullYear(), date?.getMonth() || oldDate.getMonth(), date?.getDate() || oldDate.getDate(), oldDate.getHours(), oldDate.getMinutes());
    setStartDate(newStartDate);
  }

  const handleStartTimeChange = (date: Date | undefined) => {
    const oldDate = startDate || new Date();
    const newStartDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), date?.getHours() || 0, date?.getMinutes() || 0);
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    const oldDate = endDate || new Date();
    const newDate = new Date(date?.getFullYear() || oldDate.getFullYear(), date?.getMonth() || oldDate.getMonth(), date?.getDate() || oldDate.getDate(), oldDate.getHours(), oldDate.getMinutes());
    setEndDate(newDate);
  }

  const handleEndTimeChange = (date: Date | undefined) => {
    const oldDate = endDate || new Date();
    const newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), date?.getHours() || 0, date?.getMinutes() || 0);
    setEndDate(newDate);
  };



  if (!isClient) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="flex flex-col space-y-2">
        <Label>Voting Start</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate instanceof Date ? format(startDate, "PPPp") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={startDate} onSelect={handleStartDateChange} initialFocus />
            <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={handleStartTimeChange}
                      date={startDate}
                    />
                  </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Voting End</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate instanceof Date ? format(endDate, "PPPp") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={handleEndDateChange} initialFocus />
            <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={handleEndTimeChange}
                      date={endDate}
                    />
                  </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Title */}
      <div className="flex flex-col space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Short Description */}
      <div className="flex flex-col space-y-2">
        <Label>Short Description</Label>
        <Input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
      </div>

      {/* Body */}
      <div className="flex flex-col space-y-2">
        <Label>Body</Label>
        <div className="border border-gray-300 rounded-md p-2 bg-white">
          <EditorComponent 
            className="border rounded-lg p-2"
            content={body ?? undefined}
            onChangeCallback={handleEditorStateChange}
          />
        </div>
      </div>


      {/* Status */}
      {proposalId && <div className="flex flex-col space-y-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>}

      <div className="flex justify-end">
        <Button disabled={isSaving} type="submit" className="bg-black text-white">{isSaving ? "Saving..." : "Submit"}</Button>
      </div>
    </form>
  )
}