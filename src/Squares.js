import {useEffect, useState} from "react";

export default function Squares(props) {
    const RegColor = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"]
    const HighlightStrength = 160 //Out of 255
    const HighlightColor = [`rgb(255, ${HighlightStrength}, ${HighlightStrength})`,
    `rgb(255, 255, ${HighlightStrength})`,
    `rgb(${HighlightStrength}, 255, ${HighlightStrength})`,
    `rgb(${HighlightStrength}, ${HighlightStrength}, 255)`]
    const LengthArray = [1, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10]
    const[Stage, setStage] = useState(0)
    const[SquaresColor, setSquaresColors] = useState([...RegColor])
    const TimeForEachLightToStayOn = 200 //Milliseconds
    const TimeBetweenEachLightToTurnOn = 50 //Milliseconds
    function FlashSingle(Index, MultipleIndexs) {
        let ArrayToReturn = RegColor
        if (MultipleIndexs) {
            Index.forEach((INDEX) => {
                ArrayToReturn[INDEX - 1] = HighlightColor[INDEX - 1]
            })
        }else{ArrayToReturn[Index - 1] = HighlightColor[Index - 1]}
        setSquaresColors(ArrayToReturn)
    }
    function Flash(ArrayToFlash, MultipleColorsAtOnce, TimePerEachOneToAppear, InBetweenTime) {
        //If "MultipleColorsAtOnce" == false ArrayToFlash format = [2, 3, 1, 4, 2, 3]
        //If "MultipleColorsAtOnce" == true ArrayToFlash format = [[2, 3], [1, 4], [2, 3]]
        if (MultipleColorsAtOnce) {
            ArrayToFlash.forEach((ColorIndexes, TableIndex) => {
                if (TableIndex !== 0) {
                    setTimeout(() => FlashSingle(ColorIndexes, true), InBetweenTime);
                }else{FlashSingle(ColorIndexes, true)}
                console.log(ColorIndexes)
                setTimeout(() => {setSquaresColors(RegColor)
                console.log("setSquaresColorFire!!")}, TimePerEachOneToAppear)
            })
        }
    }
    const[SequenceOrder, setSequenceOrder] = useState([])
    useEffect(() => {
        Flash([[1, 4], [2, 3]], true, 2000, 500)
        const LengthOfOurArray = LengthArray[Stage]
        let CurrentStage = []
        while (CurrentStage.length < LengthOfOurArray) {
            CurrentStage.push(Math.floor(Math.random()*4)+1)
        }
        setSequenceOrder(CurrentStage)
    }, [Stage])
    const SquaresHeight = "54.55vw"
    console.log("render")
    useEffect(() => {
        console.log("Hello, RegColor has changed, Thank you for your awareness...")
    }, [RegColor])
    return (
        <div style = {{"display":"grid", "gridTemplateColumns":"50% 50%"}}>
            <div style = {{"backgroundColor":SquaresColor[0], "height":SquaresHeight}}>  </div>
            <div style = {{"backgroundColor":SquaresColor[1], "height":SquaresHeight}}>  </div>
            <div style = {{"backgroundColor":SquaresColor[2], "height":SquaresHeight}}>  </div>
            <div style = {{"backgroundColor":SquaresColor[3], "height":SquaresHeight}}>  </div>
        </div>
    )
}