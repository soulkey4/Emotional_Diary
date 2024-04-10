import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DiaryDispatchContext } from "../App"

const New = () => {
    const { onCreate } = useContext(DiaryDispatchContext)

    const onSubmit = (input) => {
        onCreate(
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        )
        // 새로운 일기를 추가하는 동시에 화면이동기능 , 뒤로가기 방지기능
        nav("/", { replace: true })
    }

    const nav = useNavigate()
    return (
        <div>
            <Header
                title={"새일기 쓰기"}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
            />
            <Editor onSubmit={onSubmit} />
        </div>

    )
}

export default New