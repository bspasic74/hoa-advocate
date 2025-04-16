"use client"

import { useState, useRef } from "react"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import EditorComponent from "@/components/wyswyg-editor/editor-component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createCommunityMessage, updateCommunityMessage } from "@/db/db-actions-cm";
import "@/components/wyswyg-editor/index.css";
import { EditorState } from "lexical";
import { useRouter } from "next/navigation";

interface CMEditorFormProps {
  initialData?: {
    id: number;
    date?: Date;
    category: string;
    title: string;
    shortdescription: string;
    body: string | null;
  };
  onSubmit?: (data: any) => Promise<void>;
}

export function CMEditorForm({ initialData, onSubmit }: CMEditorFormProps) {
  const router = useRouter();

  console.log("initialData", initialData);

  const [date, setDate] = useState<Date | undefined>(initialData?.date ? new Date(initialData.date) : new Date());
  const [type, setType] = useState(initialData?.category || "Notification");
  const [title, setTitle] = useState(initialData?.title || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortdescription || "");

  const editorStateRef = useRef<EditorState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
 
  const handleEditorStateChange = (editorState: EditorState) => {
    editorStateRef.current = editorState;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setIsSaving(true);

    const payload = {
      date: date ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : undefined,
      category: type,
      title,
      shortdescription: shortDescription,
      body: editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null,
      adminId: "test",
    };

    let response;

    try {
      if (initialData?.id) {
        response = await updateCommunityMessage(initialData.id, payload);
      } else {
        response = await createCommunityMessage(payload);
      }

      setIsSaving(false);

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      if (onSubmit) {
        await onSubmit(response);
      } else {
        router.push(`/community-messages/${response.message?.id}`);
      }
    } catch (error) {
      setIsSaving(false);
      setErrorMessage("An error occurred while saving");
      console.error(error);
    }
  };

  return (
    <>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
              content={initialData?.body ? initialData.body : undefined}
              onChangeCallback={handleEditorStateChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="bg-black text-white">
            {isSaving ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  )
}