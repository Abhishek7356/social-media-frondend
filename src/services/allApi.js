import { serverURL } from "./ServerUrl"
import { commonApi, commonApiFileUploadAndDatas, commonFileUpdate, commonFileUploadApi } from "./commonApi"


export const getAllPost = async () => {
    return await commonApi('get', `${serverURL}/all-post`, '');
}

export const getUser = async (username, userId) => {
    return await commonApi('get', `${serverURL}/get-user?username=${username}&userId=${userId}`, '');
}

export const getFriends = async () => {
    return await commonApi('get', `${serverURL}/get-alluser`, '');
}

export const getCurrentUserPost = async (id) => {
    return await commonApi('get', `${serverURL}/current-user-post/${id}`, '');
}

export const getLoginUserStatus = async (user) => {
    return await commonApi('post', `${serverURL}/login`, user);
}

export const registerUser = async (userDetails) => {
    return await commonApi('post', `${serverURL}/register`, userDetails);
}

export const updatePostLikes = async (userDetails, postId) => {
    return await commonApi('put', `${serverURL}/postlikes/${postId}`, userDetails);
}

export const addNewPost = async (postDetails) => {
    return await commonApi('post', `${serverURL}/add-post`, postDetails);
}

//for file upload
export const addfile = async (data) => {
    return await commonFileUploadApi(`${serverURL}/uploadfile`, data)
}

//for follow settings
export const handleAllFollows = async (currentUserId, userId) => {
    return await commonApi("put", `${serverURL}/follows/${userId}`, currentUserId);
}

export const updateImage = async (userId, data) => {
    return await commonFileUpdate(`${serverURL}/uploadProfilePicture/${userId}`, data)
}

//get coversation
export const getConversation = async (userId) => {
    return await commonApi('get', `${serverURL}/conversation/${userId}`, '')
}

export const setConversationserver = async (conversationDetails) => {
    return await commonApi('post', `${serverURL}/conversation`, conversationDetails)
}

//get messages
export const getMessages = async (coversationId) => {
    return await commonApi('get', `${serverURL}/message/${coversationId}`, '')
}

export const sendMessages = async (messageDetails) => {
    return await commonApi('post', `${serverURL}/message`, messageDetails)
}

//get chat of particular two users
export const getParticularConversation = async (firstUserId, secondUserId) => {
    return await commonApi('get', `${serverURL}/conversation/${firstUserId}/${secondUserId}`, '')
}
//update user
export const updateUser = async (id, data, reqHeader) => {
    return await commonApiFileUploadAndDatas('put', `${serverURL}/update/user/${id}`, data, reqHeader)
}

//update user
export const updateUserDetails = async (id, data) => {
    return await commonApiFileUploadAndDatas('put', `${serverURL}/api/user/${id}`, data, '')
}