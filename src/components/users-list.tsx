import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/db/db-actions-users';

interface User {
    id: string;
    name: string | null;
}

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
                const data = await getAllUsers();
                setUsers(data); 
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/user/${user.id}`}>
                            <a>{user.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
