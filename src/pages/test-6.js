// 自定义 Hook
import { useState, useEffect } from 'react'
import axios from 'axios'

const useList = () => {
    const [list, setList] = useState(null)
    useEffect(() => {
        ajax().then(list => {
            setList(list)
        })
    }, [])      // 确保只在第一次运行
    return {
        list,
        setList
    }
}
export default useList

function ajax() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 11, name: 'frank' },
                { id: 22, name: 'frank' },
                { id: 33, name: 'frank' },
                { id: 44, name: 'frank' }
            ])
        }, 1000)
    })
}
