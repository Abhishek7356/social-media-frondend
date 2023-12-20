import React, { useContext, useEffect, useRef, useState } from 'react'
import './Messenger.css'
import Conversation from '../../components/Conversation/Conversation'
import Message from '../../components/Message/Message'
import OnlineFriends from '../../components/OnlineFriends/OnlineFriends'
import { StateProvider } from '../../context/AuthContext'
import { getConversation, getMessages, getUser, sendMessages, getFriends, handleAllFollows, setConversationserver } from '../../services/allApi'
import user_image from '../../images/user.png'
import { io } from 'socket.io-client'


export default function Messenger() {

    const { user } = useContext(StateProvider);
    const [conversation, setCoversation] = useState([])
    const [chat, setChat] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [messageText, setMessageText] = useState('')
    const [arrivalmessage, setArrivalmessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [conversationFriend, setConversationFriend] = useState({})
    const scrollref = useRef();
    const socket = useRef()
    // console.log(messageText);
    const fetchFriends = async () => {
        let response = await getFriends();
        setFriends(response.data);
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on("getMessages", (data) => {
            setArrivalmessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
        fetchFriends();
    }, [])

    // console.log(friends)

    const fetchUser = async () => {
        const receiverId = currentChat.member?.find((id) => id !== user._id)
        if (receiverId) {
            let response = await getUser('', receiverId)
            // console.log(response)
            setConversationFriend(response.data)
        }

    }

    useEffect(() => {
        fetchUser()
    }, [currentChat])

    useEffect(() => {
        if (arrivalmessage) {
            if (currentChat?.member?.includes(arrivalmessage.senderId)) {
                setChat((prev) => [...prev, arrivalmessage])
            }
        }
    }, [currentChat, arrivalmessage])

    useEffect(() => {
        socket?.current.emit("sendUser", user._id);
        socket?.current.on("getUser", (users) => {
            setOnlineUsers(users)
        })
    }, [user])

    const fetchCoversation = async () => {
        let response = await getConversation(user._id);
        console.log(response.data);
        setCoversation(response.data)
    }
    useEffect(() => {
        fetchCoversation();
    }, [user._id]);

    const getallMessages = async () => {
        let response = await getMessages(currentChat._id);
        // console.log(response);
        setChat(response.data)
    }
    useEffect(() => {
        getallMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])

    const handleSendMessage = async () => {

        const receiverId = currentChat.member.find((userId) => userId !== user._id);

        if (messageText) {
            socket.current.emit("sendMessages", { senderId: user._id, text: messageText, receiverId });

            let response = await sendMessages({ conversationId: currentChat._id, senderId: user._id, text: messageText });
            // console.log(response);
            setChat([...chat, response.data]);
            setMessageText('')
        }
    }

    const handleConversation = async (id) => {
        let response = await setConversationserver({ receiverId: id, senderId: user._id });
        console.log(response.data)
        setCurrentChat(response.data)
    }

    let allFriends = friends.map((item) => (
        <div onClick={() => handleConversation(item._id)}>
            {item._id != user._id &&
                <Conversation users={item} />}
        </div>
    ))

    let allConversation = conversation?.map((c) => (
        <div onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} />
        </div>
    ));

    let allChat = chat?.map((item) => (
        <div ref={scrollref}>
            <Message message={item} own={item.senderId === user._id} />
        </div>
    ))

    let allOnlineUsers = onlineUsers.map(thisUser => (
        thisUser.userId !== user._id && <OnlineFriends onlineUser={thisUser} setCurrentChat={setCurrentChat} />
    ))
    // console.log(chat)

    return (
        <div className='chatContainer'>
            <div className='chatLeftBar'>
                <input type="text" placeholder='Search for friends' />
                {allConversation}
                <hr />
                <h5>All Friends</h5>
                {allFriends}
            </div>
            <div className='conversationContainer'>
                <div className='chatBox' >
                    {conversationFriend.username && <div className='profileTopBar'>
                        <img style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} src={conversationFriend.profile_picture ? `http://localhost:4000/images/${conversationFriend.profile_picture}` : user_image} alt="" />
                        <h5>{conversationFriend.username}</h5>
                    </div>}
                    {chat.length > 0 ? allChat : <p className='noMsg'>Open a Chat to show messages</p>}
                </div>
                <div className='typingSection'>
                    <textarea onChange={(e) => setMessageText(e.target.value)} value={messageText} placeholder='Enter message' className='typeMsg'></textarea>
                    <button onClick={handleSendMessage} className='btn btn-primary'><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
            <div className='rightChatBar'>
                <h4>Online friends</h4>
                {allOnlineUsers}
            </div>
        </div>
    )
}
