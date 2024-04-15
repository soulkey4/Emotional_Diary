import { useState, useContext } from "react"
import { DiaryStateContext } from "../App"
import Header from "../components/Header"
import Button from "../components/Button"
import DiaryList from "../components/DiaryList"
import usePageTitle from "../hooks/usePageTilte"


const getMonthlyData = (pivotDate, data) => {
    // pivotDate에 년도 월에 1일 0시 0분 0초 라는 시간
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime()

    // 0,23,59,59 로 하면 이전 달의 마지막 시간으로 나옴
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime()
    return data.filter((item) =>
        beginTime <= item.createdDate
        &&
        item.createdDate <= endTime)
}

const Home = () => {

    const data = useContext(DiaryStateContext)

    // 날짜 상태관리
    const [pivotDate, setPivotDate] = useState(new Date())

    const monthlyData = getMonthlyData(pivotDate, data)

    const onIncreadseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }
    const onDecreadseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }
    return (<div>
        <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
            leftChild={<Button onClick={onDecreadseMonth} text={"<"} />}
            rightChild={<Button onClick={onIncreadseMonth} text={">"} />}
        />
        <DiaryList data={monthlyData} />
    </div>
    )
}

export default Home