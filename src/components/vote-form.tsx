"use client";

import React, { useState } from "react";
import { voteForProposal } from "@/db/db-actions-proposals";
import toast from 'react-hot-toast'; 
import { useRouter } from "next/navigation";

interface VoteFormProps {
  proposalId: number;
}

export default function VoteForm({ proposalId }: VoteFormProps) {
  const router = useRouter();
  const [voteValue, setVoteValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!voteValue) {
      toast.error("Please select a vote option.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await voteForProposal(proposalId, voteValue === "yes");

      if (result?.success) {
        toast.success("Vote submitted successfully!");
        //router.refresh();
      } else {
        toast.error(result?.error || "Error submitting vote.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <label htmlFor="vote" className="block text-lg font-medium text-gray-700 mb-2">
        Vote
      </label>
      <select
        id="vote"
        name="vote"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        required
        value={voteValue}
        onChange={(e) => setVoteValue(e.target.value)}
        disabled={isSubmitting}
      >
        <option value="">Select your vote</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Vote"}
      </button>
    </form>
  );
}