import { useContext, useState, useEffect } from "react"
import { DiaryStateContext } from "../App"
import { useNavigate } from "react-router-dom"

// 커스텀 훅
// 매개변수로 id를 전달받아서 data state로 부터 find 매서드를 이용하여 id가 같은 데이터를 
// setcurDiaryItem에 저장함
const useDiary = (id) => {
    const data = useContext(DiaryStateContext)
    const [curDiaryItem, setcurDiaryItem] = useState()
    const nav = useNavigate()

    useEffect(() => {
        const currentDiaryItem =
            data.find((item) => String(item.id) === String(id))

        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다")
            nav("/", { replace: true })
        }
        setcurDiaryItem(currentDiaryItem)
    }, [id, data])

    return curDiaryItem
}

export default useDiary