import {getEmotionImage} from "../util/get-emotion-image"
import Button from "./Button"
import "./DiaryItem.css"
const DiaryItem = () =>{
    return (
    <div className="DiaryItem">
        <div className="img_section">
            <img src = {getEmotionImage(1)}/>
        </div>
        <div className="info_section">
            <div className="created_date">
                {new Date().toLocaleDateString()}
            </div>
            <div className="content">일기 컨텐츠</div>
        </div>
        <div className ="button_section">
            <Button text = {"수정하기"}></Button>
        </div>
    </div>
    )
    
}

export default DiaryItem