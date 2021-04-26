import { useState, useCallback} from 'react';

// custom hook 은 유일하게 공통되는 변수(?)들을 컴포넌트 처럼 정의해서 사용가능 
export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const [handler] = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler];
}