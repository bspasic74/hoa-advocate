export default function Page() {
  return (
    
    <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold">Community Messages</h1>
            </div>
        </div>
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-2xl bg-gray-300/50">
          <div className="p-2.5">
              <div className="pb-2.5 pt-2.5"><p className="italic">04.10.2025 / Notification</p></div>
              <div className="pb-2.5 pt-2.5"><h3 className="font-bold">Message 1</h3></div>
              <div className="pb-2.5 pt-2.5"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div>
          </div>
      </div>
      <div className="aspect-video rounded-2xl bg-gray-300/50">
      <div className="p-2.5">
      <div className="pb-2.5 pt-2.5"><p className="italic">04.9.2025 / Update</p></div>
      <div className="pb-2.5 pt-2.5"><h3 className="font-bold">Message 2</h3></div>
      <div className="pb-2.5 pt-2.5"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div>
      </div>
      </div>
      <div className="aspect-video rounded-2xl bg-gray-300/50">
      <div className="p-2.5">
      <div className="pb-2.5 pt-2.5"><p className="italic">04.08.2025 / Meeting Notes</p></div>
      <div className="pb-2.5 pt-2.5"><h3 className="font-bold">Message 3</h3></div>
      <div className="pb-2.5 pt-2.5"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div>
      </div>
      </div>
    </div>
</div>
  )
}