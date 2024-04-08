import './App.css'
import { useReducer, useRef, createContext} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
//
// <Routes> 안에는 <Route> 만들어갈 수 있음!
const mockDate = [
  {
    id: 1,
    createdDate :new Date("2024-04-19").getTime(),
    emotionId: 1,
    content: "1번일기 내용",
  },
  {
    id: 2,
    createdDate :new Date("2024-04-18").getTime(),
    emotionId: 2,
    content: "2번일기 내용",
  },
  {
    id: 3,
    createdDate :new Date("2024-03-18").getTime(),
    emotionId: 3,
    content: "3번일기 내용",
  }
]

function reducer(state, action){
  switch(action.type){
    case "CREATE": 
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) => String(item.id) === String(action.data.id)
      ? action.data : item)
    case "DELETE":
      return state.filter((item) =>String(item.id) !== String(action.id))
      // 삭제할 id와 같지 않은 요소들만 필터링 해서 리턴하면 = 삭제
    default:
      return state
  }

}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()


function App() {
  const [data, dispatch] =useReducer(reducer, mockDate)
  const idRef = useRef(3)

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) =>{
    dispatch({
      type : "CREATE",
      data :{
        id : idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) =>{
    dispatch({
      type : "UPDATE",
      data: {
        id,
        createdDate,
        emotionId, 
        content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) =>{
    dispatch({
      type : "DELETE",
      id,
    })

  }

  return (
    <>
  <DiaryStateContext.Provider value = {data}>
    <DiaryDispatchContext.Provider value ={{
      onCreate,onUpdate,onDelete
    }}>
    <Routes>
      <Route path ="/" element ={<Home />}/>
      <Route path ="/new" element ={<New />}/>
      <Route path ="/diary/:id" element ={<Diary />}/>
      <Route path ="/edit/:id" element ={<Edit />}/>
    </Routes>
    </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
    </>
  )
}

export default App
