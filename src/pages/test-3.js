import React, { Component, useEffect } from 'react'

class FriendStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOnline: null
        }
        this.handleStatusChange = this.handleStatusChange.bind(this)
    }
    componentDidMount() {
        document.title = `You clicked ${this.state.account} times`
    }
    componentDidUpdate(prevProps, prevState) {
        document.title = `You clicked ${this.state.account} times`
        if (prevProps.count !== this.state.count) {}
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        })
    }

    render() {
        if (this.sstate.isOnline === null) {
            return 'Loading...'
        }
        return this.state.isOnline ? 'Online': 'Offline'
    }
}

export default FriendStatus
