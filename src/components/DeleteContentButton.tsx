'use client';

export function DeleteContentButton() {
  return (
    <button
      type="button"
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={(e) => {
        const confirmed = confirm("Are you sure you want to delete this?");
        if (confirmed) {
        
          const form = e.currentTarget.closest("form");
          form?.requestSubmit();
        }
      }}
    >
      Delete
    </button>
  );
}