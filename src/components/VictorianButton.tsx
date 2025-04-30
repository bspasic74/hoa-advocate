import { Button } from "@/components/ui/button"

export function VictorianButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      className="bg-amber-700 text-amber-50 font-serif rounded relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-amber-800 hover:-translate-y-0.5 hover:shadow-md border border-amber-600 before:content-[''] before:absolute before:inset-[-2px] before:border before:border-amber-600 before:rounded opacity-0 hover:before:opacity-100"
    >
      {children}
    </Button>
  )
}