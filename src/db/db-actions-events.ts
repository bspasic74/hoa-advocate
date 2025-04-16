'use server';

import { eq, InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import { users } from './schema/users';
import { events} from '@/schema';

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
    console.log("eventDate", eventDate);
    const newMessage = await db.insert(events)
    .values({
      title,
      description,
      shortdescription,
      eventDate,
      adminId,
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
    console.log("Fetching message with ID:", eventId);
    
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
        console.log("No message found with ID:", numericId);
        return null; // Message not found
      }
      
      return result[0]; // Return the found message
    } catch (error) {
      console.error("Error fetching community message:", error);
      return null;
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