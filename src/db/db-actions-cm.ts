'use server';

import { desc, eq, InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import { users } from './schema/users';
import { communityMessages, todos } from '@/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function getAllUsers() {
  return await db.select().from(todos).limit(10);
}
// return await db.query.users.findMany({where: eq(users.isAdmin, false)});
//}   

export async function setUserAsAdmin(userId: string) {
  return await db.update(users).set({ isAdmin: true }).where(eq(users.id, userId)).returning();
}

interface CreateCommunityMessageProps {
  date: Date | undefined,
  category: string,
  title: string,
  shortdescription: string,
  body: string | null,
  adminId: string
}
export async function createCommunityMessage({
  date,
  category,
  title,
  body,
  shortdescription,
  adminId
}: CreateCommunityMessageProps
): Promise<{ 
  success: boolean; 
  message?: typeof communityMessages.$inferSelect; 
  error?: string 
}> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      console.error("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    if (!session.user.isAdmin) {
      return { success: false, error: "User is not an admin" };
    }

    const userId = session.user.id!;
    
    const newMessage = await db.insert(communityMessages)
    .values({
      title,
      category,
      shortdescription,
      body,
      adminId,
    })
      .returning();

    if (newMessage.length === 0) {
      return { success: false, error: "Failed to create community message" };
    }

    return { success: true, message: newMessage[0] };

  } catch (error) {
    console.error("Error creating community message:", error);
    return { success: false, error: "Failed to create community message" };

  }

}


/*export async function getCommunityMessage(messageId: number) {
  console.log("Fetching message with ID:", messageId);

  const result = await db
    .select()
    .from(communityMessages)
    .where(eq(communityMessages.id, messageId))
    .limit(1);

  if (result.length === 0) {
    return null; // Poruka nije pronađena
  }

  return result[0]; // Vraća pronađenu poruku
}*/

export async function getCommunityMessage(messageId: number) {
  console.log("Fetching message with ID:", messageId);
  
  // Ensure messageId is a number
  const numericId = typeof messageId === 'string' ? parseInt(messageId, 10) : messageId;
  
  try {
    const result = await db
      .select()
      .from(communityMessages)
      .where(eq(communityMessages.id, numericId))
      .limit(1);
    
    console.log("Query result:", result);
    
    if (result.length === 0) {
      console.log("No message found with ID:", numericId);
      return null; // Message not found
    }
    
    return result[0]; // Return the found message
  } catch (error) {
    console.error("Error fetching community message:", error);
    return null;
  }
}

export async function deleteCommunityMessage(id: number) {
  try {
    
    // Delete the community message
    const result = await db.delete(communityMessages)
      .where(eq(communityMessages.id, id))
      .returning()
    
    if (!result.length) {
      return { 
        success: false, 
        error: 'Community message not found' 
      }
    }
    
    // Revalidate paths to update UI
    revalidatePath('/community-messages')
    revalidatePath('/community/[id]')
    revalidatePath('/profile/messages')
    
    return { 
      success: true, 
      deletedMessage: result[0] 
    }
  } catch (error) {
    console.error('Error deleting community message:', error)
    return { 
      success: false, 
      error: 'Failed to delete community message' 
    }
  }
}

export async function updateCommunityMessage(
  id: number,
  {
    date,
    category,
    title,
    body,
    shortdescription,
    adminId,
  }: CreateCommunityMessageProps
): Promise<{ success: boolean; message?: typeof communityMessages.$inferSelect; error?: string }> {
  try {
    const updated = await db
      .update(communityMessages)
      .set({ category, title, body, shortdescription, adminId })
      .where(eq(communityMessages.id, id))
      .returning();

    if (updated.length === 0) {
      return { success: false, error: "Message not found or update failed" };
    }

    return { success: true, message: updated[0] };
  } catch (error) {
    console.error("Error updating community message:", error);
    return { success: false, error: "Failed to update community message" };
  }
}

export async function getCommunityMessages(count?: number) {
  console.log("Fetching all community messages");
  // Fetch all community messages from the database
  const messages = await db.select().from(communityMessages).orderBy(desc(communityMessages.modifiedAt)).limit(count ?? 10);
  return messages;
}

/*export async function getCommunityMessage(messageId: number) {
  console.log("Fetching message with ID:", messageId);
  // Fetch the message with the given ID from the database
  const mess = await db.select().from(communityMessages).where(eq(communityMessages.id, messageId)).limit(1);
  return mess[0];

  const message = await db.query.communityMessages.findFirst({
    where: eq(communityMessages.id, messageId),
  });

  return message;
}*/