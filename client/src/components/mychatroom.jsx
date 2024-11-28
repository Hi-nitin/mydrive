import { useEffect, useState } from "react";
import Navbar from "./navbar2";
import { getapi } from "../api/getpost";
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:7777');

const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState();
    const [shareError, setError] = useState();
    const [chattingwith, setChattingWith] = useState();
    const [chattingPersonId, setChattingPersonId] = useState();

    // Socket coding
    useEffect(() => {
        socket.on('msgtoclient', (msg, myid, sid) => {
            const id = sessionStorage.getItem('id');
            if (id === myid && sid === chattingPersonId) {
                setMessages(prev => [...prev, `${chattingwith}: ${msg}`]);
            }
        });

        return () => {
            socket.off('msgtoclient');
        };
    }, [chattingPersonId, chattingwith]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getapi('http://localhost:7777/fetchUsers');
            if (response.msg === 'error showing friends') {
                setError(response.msg);
            } else {
                setFriend(response);
                setError(null);
            }
        };
        fetchUsers();
    }, []);

    const handleSelectFriend = (friendId, friendName) => {
        setChattingWith(friendName);
        setChattingPersonId(friendId);
        setMessages([])
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chattingPersonId) {
            const senderId = sessionStorage.getItem('id');
            setMessages(prev => [...prev, `Me: ${message}`]);
            socket.emit('client-message', message, chattingPersonId, senderId);
            setMessage('');
        } else {
            alert('No friend selected');
        }
    };

    return (
        <>
            <Navbar />
            {shareError && <p style={{ color: 'red', textAlign: 'center' }}>{shareError}</p>}
            <div style={styles.chatroomContainer}>
                <div style={styles.friendsList}>
                    <h2>Friends List</h2>
                    {friend && friend.user.map(val => (
                      val._id!=sessionStorage.getItem('id')?  <button
                      key={val._id}
                      style={styles.friendButton}
                      onDoubleClick={() => handleSelectFriend(val._id, val.name)}
                  >
                      {val.name}
                  </button>:null
                    ))}
                </div>
                <div style={styles.chatArea}>
                    <h2>Chat Area</h2>
                    <div style={styles.currentChat}>
                        <h3>{chattingwith}</h3>
                        <ul>
                            {messages.map((val, key) => (
                                <li key={key}>{val}</li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} style={styles.messageForm}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={styles.messageInput}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

const styles = {
    chatroomContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    friendsList: {
        flex: 1,
        borderRight: '1px solid #ccc',
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#fff',
    },
    chatArea: {
        flex: 2,
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        position: 'relative',
    },
    friendButton: {
        margin: '5px 0',
        padding: '10px',
        width: '100%',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    currentChat: {
        marginBottom: '20px',
    },
    messageForm: {
        position: 'absolute',
        bottom: '20px',
        left: '0',
        right: '0',
    },
    messageInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
};

export default Chatroom;
