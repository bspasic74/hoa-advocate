import React from 'react';

interface VoteResultsProps {
  yesVotes: number;
  totalVotes: number;
}

export default function VoteResults({ yesVotes, totalVotes }: VoteResultsProps) {
  const noVotes = totalVotes - yesVotes;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl font-bold mb-2">Voting Results</h2>
      <div className="flex flex-row text-lg">
        <div className='pr-5 border-r'>✅ Yes votes: <span className="font-semibold">{yesVotes}</span></div>
        <div className='pr-5 pl-5 border-r'>❌ No votes: <span className="font-semibold">{noVotes}</span></div>
        <div className='pr-5 pl-5'>🗳️ Total votes: <span className="font-semibold">{totalVotes}</span></div>
      </div>
    </div>
  );
}