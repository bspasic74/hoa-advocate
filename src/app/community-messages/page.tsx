import { getCommunityMessages } from '@/db/db-actions-cm';
import MainCommunityMessagePageClient from '@/components/mainCommunityMessagePage';

export const runtime = "edge";

export default async function MainCommunityMessagePage() {
  const messages = await getCommunityMessages();

  return <MainCommunityMessagePageClient messages={messages} />;
}