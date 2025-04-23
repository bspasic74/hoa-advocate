'use server';

import { desc, eq, InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import { users } from './schema/users';
import { events} from '@/schema';
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth';

export async function setUserAsAdmin(userId: string) {
    return await db.update(users).set({ isAdmin: true }).where(eq(users.id, userId)).returning();
  }

  interface CreateEventProps {
    title: string,
    shortdescription: string,
    description: string | null,
    eventDate: Date,
    adminId: string
  }

  interface Event {
    id: number
    title: string
    shortdescription: string
    eventDate: Date // ISO format
  }

export async function createEvent({
  title,
  description,
  shortdescription,
  eventDate,
  adminId
}: CreateEventProps
): Promise<{ 
  success: boolean; 
  message?: typeof events.$inferSelect; 
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

    console.log("eventDate", eventDate);
    const newMessage = await db.insert(events)
    .values({
      title,
      description,
      shortdescription,
      eventDate,
      adminId : userId,
    })
      .returning();
      console.log("newMessage", newMessage);
    if (newMessage.length === 0) {
      return { success: false, error: "Failed to create event" };
    }

    return { success: true, message: newMessage[0] };

  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: "Failed to create event" };

  }

}

  export async function getEvents(eventId: number) {
    console.log("Fetching event with ID:", eventId);
    
    // Ensure eventId is a number
    const numericId = typeof eventId === 'string' ? parseInt(eventId, 10) : eventId;
    
    try {
      const result = await db
        .select()
        .from(events)
        .where(eq(events.id, numericId))
        .limit(1);
      
      console.log("Query result:", result);
      
      if (result.length === 0) {
        console.log("No event found with ID:", numericId);
        return null; // Message not found
      }
      
      return result[0]; // Return the found message
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }

  export async function deleteEvent(id: number) {
    try {
      
      // Delete the event
      const result = await db.delete(events)
        .where(eq(events.id, id))
        .returning()
      
      if (!result.length) {
        return { 
          success: false, 
          error: 'Event not found' 
        }
      }
      
      // Revalidate paths to update UI
      revalidatePath('/calendar')
      revalidatePath('/events/[eventId]')
      revalidatePath('/profile/events')
      
      return { 
        success: true, 
        deletedMessage: result[0] 
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      return { 
        success: false, 
        error: 'Failed to delete event' 
      }
    }
  }
 
  export async function updateEvent(
    id: number,
    {
      eventDate,
      title,
      description,
      shortdescription,
      adminId,
    }: CreateEventProps
  ): Promise<{ success: boolean; message?: typeof events.$inferSelect; error?: string }> {
    try {
      const updated = await db
        .update(events)
        .set({ eventDate, title, description, shortdescription, adminId })
        .where(eq(events.id, id))
        .returning();
  
      if (updated.length === 0) {
        return { success: false, error: "Event not found or update failed" };
      }
  
      return { success: true, message: updated[0] };
    } catch (error) {
      console.error("Error updating Event:", error);
      return { success: false, error: "Failed to update Event" };
    }
  }

  export async function getAllEvents() : Promise<Event[]> {
    try {
      const result = await db.select().from(events);

      return result;

    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }

  export async function getEventsList(count?: number) {
    console.log("Fetching all Events");
    // Fetch all events from the database
    const eventslist = await db.select().from(events).orderBy(desc(events.createdAt)).limit(count ?? 10);
    return eventslist;
  }