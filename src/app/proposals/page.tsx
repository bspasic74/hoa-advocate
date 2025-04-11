'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export const runtime = "edge";

export default function ProposalsPage() {
  const proposals = [
    {
      id: 1,
      title: 'Install New Security Cameras',
      body: 'Proposal to install additional security cameras at the north and south entrances.',
    },
    {
      id: 2,
      title: 'Upgrade Pool Area',
      body: 'Proposal to renovate the community pool with new furniture and resurfacing.',
    },
    {
      id: 3,
      title: 'Host Community BBQ',
      body: 'Proposal to organize a community BBQ event at the central park on May 20th.',
    },
    {
      id: 4,
      title: 'New Playground Equipment',
      body: 'Proposal to purchase and install new playground equipment for the children’s park.',
    },
    {
      id: 5,
      title: 'Hire Landscape Maintenance',
      body: 'Proposal to contract a professional landscaping service for regular maintenance.',
    },
  ];

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="bg-[#e9e9e9] rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{proposal.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">{proposal.body}</p>
            <div className="space-y-2">
              <Label htmlFor={`vote-${proposal.id}`} className="block text-sm font-medium">
                Vote
              </Label>
              <Select>
                <SelectTrigger id={`vote-${proposal.id}`} className="w-40">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
