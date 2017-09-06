let messagesService = (()=>{


    function loadMyMessages(username) {
        let endpoint = `messages?query={"recipient_username":"${username}"}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }


    function loadSentMessages(username) {
        let endpoint = `messages?query={"sender_username":"${username}"}`;
        return requester.get('appdata', endpoint, 'Kinvey');

    }


    function deleteMessage(id) {
        let endpoint = `messages/${id}`;
        return requester.remove('appdata', endpoint, 'Kinvey');
    }


    function loadUsers() {
        return requester.get('user', '', 'Kinvey')
    }

    function sendMessage(sender_username, sender_name, recipient_username, text) {
        let msgData = {
            sender_username,
            sender_name,
            recipient_username,
            text
        };

        return requester.post('appdata', 'messages', 'Kinvey', msgData);
    }

    return{
        loadMyMessages,
        loadSentMessages,
        deleteMessage,
        loadUsers,
        sendMessage

    }
})();