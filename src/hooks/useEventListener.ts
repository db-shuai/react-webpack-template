import { useEffect } from 'react';

const useEventListener = (event: string, handler: (...e:any) => void, target: any = window) => {

  useEffect(() => {
    const targetElement  = 'current' in target ? target.current : window;
    const useEventListener = (event: Event) => {
      return handler(event)
    }
    targetElement.addEventListener(event, useEventListener)
    return () => {
      targetElement.removeEventListener(event, useEventListener)
    }
  }, [event])
};

export default useEventListener;