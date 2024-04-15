import "./Editor.css"
import EmotionItem from "./EmotionItem"
import Button from "./Button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { emotionList } from "../util/constants"
import { getStringDate } from "../util/getStringDate"


const Editor = ({ initData, onSubmit }) => {
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: "",
    })

    const onChangeInput = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "createdDate") {
            value = new Date(value)
        }

        setInput({
            ...input,
            [name]: value,
        })
    }

    const onClickSubmitButton = () => {
        onSubmit(input)
    }

    const nav = useNavigate()

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate))
            })
        }
    }, [initData])

    return (
        <div className="Editor">
            <section className="data_section">
                <h4>오늘의 날짜</h4>
                <input
                    name="createdDate"
                    // 변화한 값 state에 저장하기 위함
                    onChange={onChangeInput}
                    value={getStringDate(input.createdDate)} type="date" />
            </section>

            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list">
                    {emotionList.map((item) =>
                    (<EmotionItem
                        onClick={() => onChangeInput({
                            target: {
                                name: "emotionId",
                                value: item.emotionId,
                            }
                        })}
                        key={item.emotionId}
                        {...item}
                        isSelected={item.emotionId === input.emotionId} />))}
                </div>
            </section>

            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder="오늘은 어땠나요?" />
            </section>

            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"}></Button>
                <Button
                    onClick={onClickSubmitButton}
                    text={"작성완료"}
                    type={"positive"}>

                </Button>
            </section>

        </div>
    )
}

export default Editor