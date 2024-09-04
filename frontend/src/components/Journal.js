import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Journal = () => {
    const [entries, setEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingEntryId, setEditingEntryId] = useState(null);

    const fetchEntries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/journal', {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            setEntries(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const entryData = { title, content };

        try {
            if (editingEntryId) {
                await axios.put(`http://localhost:5000/api/journal/${editingEntryId}`, entryData, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setEditingEntryId(null);
            } else {
                await axios.post('http://localhost:5000/api/journal', entryData, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
            }
            setTitle('');
            setContent('');
            fetchEntries();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const onEdit = (entry) => {
        setEditingEntryId(entry._id);
        setTitle(entry.title);
        setContent(entry.content);
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/journal/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            fetchEntries();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Your Journal</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editingEntryId ? 'Update Entry' : 'Add Entry'}</button>
            </form>
            <div>
                {entries.map((entry) => (
                    <div key={entry._id} style={styles.entry}>
                        <h3>{entry.title}</h3>
                        <p>{entry.content}</p>
                        <button onClick={() => onEdit(entry)}>Edit</button>
                        <button onClick={() => onDelete(entry._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    entry: {
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
    },
};

export default Journal;
