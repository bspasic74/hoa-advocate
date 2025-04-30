import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export function VictorianCard({
  header,
  children,
  footer,
}: {
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="relative w-full my-8 pt-2">
      {/* Corner Decorations */}
      <div className="absolute -top-6 -left-6 -right-6 -bottom-6 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-14 h-14 bg-no-repeat bg-cover" style={{ backgroundImage: "url('/corner-ornament.png')" }} />
        <div className="absolute top-0 right-0 w-14 h-14 bg-no-repeat bg-cover transform scale-x-[-1]" style={{ backgroundImage: "url('/corner-ornament.png')" }} />
        <div className="absolute bottom-0 left-0 w-14 h-14 bg-no-repeat bg-cover transform scale-y-[-1]" style={{ backgroundImage: "url('/corner-ornament.png')" }} />
        <div className="absolute bottom-0 right-0 w-14 h-14 bg-no-repeat bg-cover transform scale-[-1]" style={{ backgroundImage: "url('/corner-ornament.png')" }} />
      </div>

      {/* Borders */}
      <div className="absolute inset-0 pointer-events-none z-9">
        {/* Top Border */}
        <div className="absolute -top-3 left-14 right-14 h-6 bg-repeat-x bg-contain" style={{ backgroundImage: "url('/horizontal-border.png')" }} />
        {/* Bottom Border */}
        <div className="absolute -bottom-3 left-14 right-14 h-6 bg-repeat-x bg-contain transform scale-y-[-1]" style={{ backgroundImage: "url('/horizontal-border.png')" }} />
        {/* Left Border */}
        <div className="absolute -left-3 top-14 bottom-14 w-6 bg-repeat-y bg-contain" style={{ backgroundImage: "url('/vertical-border.png')" }} />
        {/* Right Border */}
        <div className="absolute -right-3 top-14 bottom-14 w-6 bg-repeat-y bg-contain transform scale-x-[-1]" style={{ backgroundImage: "url('/vertical-border.png')" }} />
      </div>

      {/* Double Inner Borders */}
      <div className="absolute top-5 left-5 right-5 bottom-5 border-2 border-amber-700 pointer-events-none z-8">
        <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-amber-800 pointer-events-none" />
      </div>

      {/* Card */}
      <Card className="relative bg-amber-50 z-5 shadow-md overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAy...')", backgroundSize: "cover" }} />

        {/* Header */}
        {header && (
          <CardHeader className="relative text-center font-serif text-2xl text-amber-900 p-6">
            {header}
          </CardHeader>
        )}

        {/* Content */}
        <CardContent className="relative p-8 text-amber-800 font-light">
          {children}
        </CardContent>

        {/* Footer */}
        {footer && (
          <CardFooter className="relative flex justify-center p-6">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}