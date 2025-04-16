'use client';

import { db } from "@/db";
import { getAllUsers } from "@/db/db-actions-cm";
import { todos } from "@/schema";
import { useEffect } from "react";

export const runtime = "edge";

export default function Test4Page() {

    useEffect(() => {
        const fetchTodos = async () => {
            const todos = await getAllUsers();
            console.log("Todos:", todos);
        };
        fetchTodos();
    }, []);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full space-y-6 rounded-lg bg-[#e9e9e9] p-6 shadow-md">
                <h2 className="text-xl font-semibold text-center">Test 4</h2>
                <p>Check the console for community messages.</p>
            </div>
        </div>
    );
}