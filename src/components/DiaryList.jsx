import Button from "./Button"
import "./DiaryList.css"
import DiaryItem from "./DiaryItem"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DiaryList = ({ data }) => {

    const nav = useNavigate()

    const [sortType, setsortType] = useState("latest")

    const onChangeSortType = (e) => {
        setsortType(e.target.value)
    }

    // 객체값을 비교할때는 직접 비교함수를 만들어야함
    const getSortedDate = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate)
            }
            else {
                return Number(b.createdDate) - Number(a.createdDate)
            }

        })
    }
    const sortedData = getSortedDate()
    return (
        <div className="DiaryList">
            <div className="menu_bar ">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button onClick={() => nav(`/new`)} text={"새 일기 쓰기"} type={"positive"}></Button>
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => <DiaryItem key={item.id} {...item} />)}
            </div>
        </div>
    )

}

export default DiaryList