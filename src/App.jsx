import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route, json } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
//
// <Routes> 안에는 <Route> 만들어갈 수 있음!


function reducer(state, action) {
  let nextState

  switch (action.type) {
    case "INIT":
      return action.data

    case "CREATE": {
      nextState = [action.data, ...state]
      break
    }

    case "UPDATE":
      {
        nextState = state.map((item) => String(item.id) === String(action.data.id)
          ? action.data : item)
        break
      }

    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id))
      break
    }
    // 삭제할 id와 같지 않은 요소들만 필터링 해서 리턴하면 = 삭제

    default:
      return state
  }
  localStorage.setItem("diary", JSON.stringify(nextState))
  return nextState
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()


function App() {
  const [isLoding, setisLoding] = useState(true)
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)


  useEffect(() => {
    const storedData = localStorage.getItem("diary")
    if (!storedData) {
      setisLoding(false)
      return
    }
    const parsedData = JSON.parse(storedData)

    //Array.isArray() = 배열인지 아닌지 확인하는 JS 내장함수
    if (!Array.isArray(parsedData)) {
      setisLoding(false)
      return
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    })
    idRef.current = maxId + 1

    dispatch({
      type: "INIT",
      data: parsedData
    })
    setisLoding(false)
  }, [])


  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })

  }

  if (isLoding) {
    return <div>데이터 로딩중입니다...</div>

  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate, onUpdate, onDelete
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
