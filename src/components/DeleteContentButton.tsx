'use client';

import { useState } from 'react';

interface Props {
  onDelete: () => void;
}

export function DeleteContentButton({ onDelete }: Props) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <button
      type="button"
      className="bg-red-600 text-white px-4 py-2 rounded"
      onClick={async () => {
        const confirmed = confirm("Are you sure you want to delete this content?");
        if (!confirmed) return;

        setSubmitting(true);
        await onDelete();
      }}
      disabled={submitting}
    >
      {submitting ? 'Deleting...' : 'Delete'}
    </button>
  );
}