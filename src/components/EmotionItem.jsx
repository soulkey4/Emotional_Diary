import "./EmotionItem.css"
import { getEmotionImage } from "../util/get-emotion-image"

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
    return (
        <div
            // 이모션은 컴포넌트로 되있기 때문에 따로 만들어줌
            // div를 클릭하면 onclik 함수 발생하도록
            onClick={onClick}
            className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}>
            <img className="emotion_img" src={getEmotionImage(emotionId)} />
            <div className="emotion_name">{emotionName}</div>

        </div>
    )
}

export default EmotionItem