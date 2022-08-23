// https://juejin.cn/post/7121551701731409934#heading-0


import React, { useEffect, useState } from 'react';
import HOC from './components/HOC';
import Mock from 'mockjs';

// 子组件
const Item:React.FC<{id: any, index?:number}> = ({id, index}) => {

  return (
    <div style={{display: 'flex', alignItems: 'center', padding: 5, lineHeight: '24px', border: '1px solid #ccc'}}>
     列表{index}: {id}
    </div>
  )
}

const ItemHoc = HOC(Item)

const Index:React.FC<any> = (props)=> {

  const [list, setList] = useState<any>([])

  useEffect(() => {
    let arr:any[] = [] 
    for(let i = 0; i < 100; i++){
      arr.push({
        id: i,
        content: Mock.mock('@csentence(40, 100)')
      })
    }

    setList(arr)
  }, [])

  if(list.length === 0) return <></>

  return (
    <div>
      <ItemHoc list={list} />
   </div>
  );
}

export default Index;