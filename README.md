# React performance optimaization
사용할 성능 향상 방법  
1. [React.memo 사용](https://github.com/ynawhocodes/React-performance-optimization-test#1-reactmemo-%EC%82%AC%EC%9A%A9)
2. [functional update 사용](https://github.com/ynawhocodes/React-performance-optimization-test#2--functional-update-%EC%82%AC%EC%9A%A9)
3. [useReducer 사용](https://github.com/ynawhocodes/React-performance-optimization-test#3--usereducer-%EC%82%AC%EC%9A%A9)
4. [virtual scrolling 사용](https://github.com/ynawhocodes/React-performance-optimization-test#step-05-react-virtualized-%EC%82%AC%EC%9A%A9)
## step 01. 테스트할 react todo 앱 생성
- [code](https://github.com/ynawhocodes/React-performance-optimization-test/tree/90aa5b55fef5cdd9e1fd471ed9de275517152c4a)  
  성능 테스트를 위해 더미 데이터 2500개 준비
## step 02. 기본 앱 성능 테스트
<img width="677" alt="스크린샷 2023-04-11 오후 1 58 39" src="https://user-images.githubusercontent.com/48620082/231083065-60e63f10-29f0-488c-bd43-8001b862296e.png">  

> 1.02초 소요
## step 03. 성능 최적화  
### 1) React.memo 사용
   - [commit log](https://github.com/ynawhocodes/React-performance-optimization-test/commit/e8c21f11d59aaac3067358ae548d19f92d2d352c?diff=split)
      -  문제: todo 한 항목만 체크해도 App 컴포넌트의 state가 변경되면서 App 컴포넌트, 하위 컴포넌트들이 모두 리렌더링 됨
      -  해결: TodoListItem 컴포넌트의 props인 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링 안되록 함  
      ```
        (...)
        export default React.memo(TodoListItem);
      ```
   - React.memo
      - 불필요한 리렌더링 방지
      - 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능 최적화
### 2)  functional update 사용
   - [commit log](https://github.com/ynawhocodes/React-performance-optimization-test/commit/abcefae9e4ef221ae3046ca8117f47c31c500cd1?diff=split)
     - 문제: onRemove, onToggle 함수는 todos 배열을 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 생성됨
     - 해결: 함수형 업데이트로 함수가 계속 만들어지는 상황을 방지
   - AS-IS
      ```
      const onRemove = useCallback(
        (id) => {
          const newTodos = todos.filter((todos) => id !== todos.id);
          setTodos(newTodos);
        },
        [todos],
      );
      ```
  - TO-BE
      ```
      const onRemove = useCallback((id) => {
        const newTodos = (todos) => todos.filter((todos) => id !== todos.id);
        setTodos(newTodos);
      }, []);
      ```  
      
  - useState의 함수형 업데이트  
    - set 함수를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 파라미터로 넣음
### 3)  useReducer 사용
   - [commit log](https://github.com/ynawhocodes/React-performance-optimization-test/commit/33b8d008bc6e4ea702f72df2742e9aacfd21ce49?diff=split)
     - 문제: onRemove, onToggle 함수는 todos 배열을 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 생성됨
     - 해결: useReducer로 함수가 계속 만들어지는 상황을 방지  
   - useReducer
     - 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있는 장점이 있음
## step 04. 성능 최적화 후 성능 테스트
<img width="674" alt="스크린샷 2023-04-11 오후 2 16 25" src="https://user-images.githubusercontent.com/48620082/231083111-09eb8390-0776-48a1-adde-97e14fcdae5d.png">
  
> 0.059초 소요
## step 05. virtual scrolling 사용
   - [commit log](https://github.com/ynawhocodes/React-performance-optimization-test/commit/3f9b0c7078bb0503eb844c9a84e33b97a09acaa3?diff=split)
     - 문제:화면에 보이지 않음에도 렌더링이 이루어지는 컴포넌트들이 있음
     - 해결: react-virtualized 라이브러리를 사용하여 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 변경 
   - react-virtualized
     - 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 하도록 하는 라이브러리 

## step 06. virtual scrolling 사용 후 성능 테스트  
<img width="677" alt="스크린샷 2023-04-11 오후 2 58 09" src="https://user-images.githubusercontent.com/48620082/231083137-5ec78f6c-a846-4118-aa43-b422607f0488.png">  

> 0.005초 소요
