import { CMEditorForm } from "@/components/cm-editor-form"
export const runtime = "edge";

export default function CommunityMessageEditorPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-center">Create Community Message</h2>
        <CMEditorForm />
      </div>
    </div>
  )
}