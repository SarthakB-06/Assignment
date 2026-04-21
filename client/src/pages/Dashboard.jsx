import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data.tasks || []);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (err) {
            alert('Failed to create task');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await api.put(`/tasks/${id}`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error('Failed to update task status', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow mt-10 rounded">
            <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>


            <form onSubmit={handleCreateTask} className="mb-8 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Create New Task</h3>
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 w-full mb-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
            </form>


            <h3 className="font-semibold mb-2">My Tasks</h3>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task._id} className={`border p-4 rounded flex justify-between items-center shadow-sm ${task.status === 'completed' ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
                        <div>
                            <h4 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</h4>
                            <p className="text-gray-600">{task.description}</p>
                            <span className={`text-xs px-2 py-1 rounded inline-block mt-2 ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                Status: {task.status}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            {task.status !== 'completed' && (
                                <button
                                    onClick={() => handleUpdateStatus(task._id, 'completed')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Complete
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {tasks.length === 0 && <p className="text-gray-500 italic">No tasks found.</p>}
        </div>
    );
}