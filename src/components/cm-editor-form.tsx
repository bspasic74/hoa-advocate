"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import EditorComponent from "@/components/wyswyg-editor/editor-component";
import { createCommunityMessage, updateCommunityMessage } from "@/db/db-actions-cm";
import { EditorState } from "lexical";

import "@/components/wyswyg-editor/index.css";

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

const formSchema = z.object({
  date: z.date(),
  category: z.string(),
  title: z.string().min(1, "Title is required"),
  shortdescription: z.string().min(1, "Short description is required"),
});

export function CMEditorForm({ initialData, onSubmit }: CMEditorFormProps) {
  const router = useRouter();

  const editorStateRef = useRef<EditorState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      category: initialData?.category || "Notification",
      title: initialData?.title || "",
      shortdescription: initialData?.shortdescription || "",
    },
  });

  const handleEditorStateChange = (editorState: EditorState) => {
    editorStateRef.current = editorState;
  };

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    setErrorMessage(null);

    const payload = {
      ...values,
      date: new Date(values.date.getUTCFullYear(), values.date.getUTCMonth(), values.date.getUTCDate()),
      body: editorStateRef.current ? JSON.stringify(editorStateRef.current.toJSON()) : null,
      adminId: "test",
    };

    try {
      let response;
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="form-container space-y-6">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Notification">Notification</SelectItem>
                  <SelectItem value="Proposed Change">Proposed Change</SelectItem>
                  <SelectItem value="Update">Update</SelectItem>
                  <SelectItem value="Meeting Notes">Meeting Notes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description */}
        <FormField
          control={form.control}
          name="shortdescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Body */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Body</label>
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            <EditorComponent
              className="border rounded-lg p-2"
              content={initialData?.body ?? undefined}
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
    </Form>
  );
}