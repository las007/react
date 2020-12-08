import React, { Component, useEffect } from 'react'

class UseEffectExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: 0
        }
    }
    componentDidMount() {
        document.title = `You clicked ${this.state.account} times`
    }
    componentDidUpdate() {
        document.title = `You clicked ${this.state.account} times`
    }

    render() {
        return (
            <div>
                <p>You clicked { this.state.account } times</p>
                <button onClick={() => { this.setState({ account: this.state.account + 1 })} }>click me</button>
            </div>
        )
    }
}

export default UseEffectExample
