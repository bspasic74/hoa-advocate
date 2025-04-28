"use client";

export function DeleteContentButton() {
  return (
    <button
      type="submit"
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={() => {
        if (!confirm("Are you sure you want to delete this?")) {
    
          throw new Error("Canceled"); 
        }
      }}
    >
      Delete
    </button>
  );
}