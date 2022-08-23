import { useMemo } from 'react';

const usePow = (list: number[]) => {
  return useMemo(() => list.map((item:number) => {
    console.log(1)
    return Math.pow(item, 2)
  }), []) 
}


import { Button } from 'antd';
import React,{ useState } from 'react';

const Index:React.FC<any> = (props)=> {
  const [flag, setFlag] = useState<boolean>(true)
  const data = usePow([1, 2, 3])
  
  return (
    <div>
      <div>数字：{JSON.stringify(data)}</div>
      <Button color='primary' onClick={() => {setFlag(v => !v)}}>切换</Button>
       <div>切换状态：{JSON.stringify(flag)}</div>
    </div>
  );
}

export default Index;
