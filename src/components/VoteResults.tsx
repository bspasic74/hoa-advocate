import React from 'react';

interface VoteResultsProps {
  yesVotes: number;
  totalVotes: number;
}

export default function VoteResults({ yesVotes, totalVotes }: VoteResultsProps) {
  const noVotes = totalVotes - yesVotes;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-2">Voting Results</h2>
      <div className="text-lg">
        <p>✅ Yes votes: <span className="font-semibold">{yesVotes}</span></p>
        <p>❌ No votes: <span className="font-semibold">{noVotes}</span></p>
        <p>🗳️ Total votes: <span className="font-semibold">{totalVotes}</span></p>
      </div>
    </div>
  );
}