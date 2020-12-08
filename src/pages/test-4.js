import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null)

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline)
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)

        return function cleanup() {
            CahtAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
        }
    })

    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}
