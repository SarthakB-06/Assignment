import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const fetchAdminData = async () => {
        try {
            const [usersRes, tasksRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/tasks')
            ]);
            setUsers(usersRes.data || []);
            setTasks(tasksRes.data || []);
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user and all their tasks?')) return;
        try {
            await api.delete(`/admin/user/${id}`);
            fetchAdminData();
        } catch (err) {
            console.error('Failed to delete user', err);
            alert('Failed to delete user');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/admin/tasks/${id}`);
            fetchAdminData();
        } catch (err) {
            console.error('Failed to delete task', err);
            alert('Failed to delete task');
        }
    };

    const handleMakeAdmin = async (id) => {
        if (!window.confirm('Are you sure you want to promote this user to Admin?')) return;
        try {
            await api.put(`/admin/users/${id}/role`, { role: 'admin' });
            fetchAdminData();
        } catch (err) {
            console.error('Failed to update role', err);
            alert('Failed to make admin');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white shadow mt-10 rounded">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Admin Control Panel</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">All Users</h3>
                    <ul className="space-y-3">
                        {users.map(user => (
                            <li key={user._id} className="border p-4 rounded bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{user.name} <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">{user.role}</span></p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                {user.role !== 'admin' && (
                                    <div className="flex flex-col space-y-2 items-end">
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm whitespace-nowrap"
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm whitespace-nowrap"
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                        {users.length === 0 && <p className="text-gray-500 italic">No users found.</p>}
                    </ul>
                </div>


                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">All Tasks</h3>
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li key={task._id} className="border p-4 rounded bg-gray-50 flex flex-col items-start gap-2">
                                <div className="w-full flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold">{task.title}</h4>
                                        <p className="text-sm border-l-2 border-red-400 pl-2 mt-1 italic text-gray-500">
                                            Creator: {task.userId?.name || 'Unknown'} ({task.userId?.email || 'N/A'})
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm whitespace-nowrap"
                                    >
                                        Delete Task
                                    </button>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                    Status: {task.status}
                                </span>
                            </li>
                        ))}
                        {tasks.length === 0 && <p className="text-gray-500 italic">No tasks found.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
}