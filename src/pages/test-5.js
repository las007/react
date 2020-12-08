import React from 'react'
// import Child from './test-4'

function App() {
    const [n, setN] = React.useState(0)
    const [m, setM] = React.useState(0)
    const onClick = () => {
        setN(n + 1)
    }
    const onClickChild = () => {}

    return (
        <div>
            <div>
                {/*点击 button 会重新执行 Child 组件*/}
                <button onClick={onClick}>update n { n }</button>
            </div>
            <Child data={m} onClick={onClickChild}/>
        </div>
    )
}

/*function Child(props) {
    console.log('log child 执行了')
    console.log('a lot code.')
    return <div>child: {props.data}</div>
}

const Child2 = React.memo(Child)*/

// 使用 React.memo 可以解决重新执行 Child 组件的问题
const Child = React.memo(props => {
    console.log(' log child 执行了')
    console.log('a lot code')
    return <div onClick={props.onClick}>child: { props.data }</div>
})
