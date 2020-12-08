import useList from './test-6'

function App() {
    const { list, deleteIndex } = useList

    return (
        <div>
            <h1>List</h1>
            {
                list ? (
                    <ol>
                        {
                            list.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        {item.name}
                                        <button onClick={() => { deleteIndex(index) }}>×</button>
                                    </li>
                                )
                            })
                        }
                    </ol>
                ) : (
                    '加载中...'
                )
            }
        </div>
    )
}
export default App
