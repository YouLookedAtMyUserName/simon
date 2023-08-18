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
    const TimeForEachLightToStayOn = 1000 //Milliseconds
    const TimeBetweenEachLightToTurnOn = 200 //Milliseconds
    function FlashSingle(Index, MultipleIndexs, HighlightedFor) {
        let ArrayToReturn = [...RegColor]
        if (MultipleIndexs) {
            Index.forEach((INDEX) => {
                ArrayToReturn[INDEX - 1] = HighlightColor[INDEX - 1]
            })
        }else{ArrayToReturn[Index - 1] = HighlightColor[Index - 1]}
        setSquaresColors(ArrayToReturn)
        setTimeout(() => setSquaresColors(RegColor), HighlightedFor)
        
    }
    let CanClick = true
    function Flash(ArrayToFlash, MultipleColorsAtOnce, TimePerEachOneToAppear, InBetweenTime) {
        CanClick = false
        //If "MultipleColorsAtOnce" == false ArrayToFlash format = [2, 3, 1, 4, 2, 3]
        //If "MultipleColorsAtOnce" == true ArrayToFlash format = [[2, 3], [1, 4], [2, 3]]
        if (MultipleColorsAtOnce) {
            ArrayToFlash.forEach((ColorIndexes, TableIndex) => {
                if (TableIndex !== 0 && TableIndex != 1) {
                    setTimeout(() => FlashSingle(ColorIndexes, true, TimePerEachOneToAppear), (InBetweenTime*(TableIndex + 1))+(TableIndex * TimePerEachOneToAppear));
                }else if (TableIndex == 1) {
                    setTimeout(() => FlashSingle(ColorIndexes, true, TimePerEachOneToAppear), InBetweenTime + TimePerEachOneToAppear);
                }else{FlashSingle(ColorIndexes, true, TimePerEachOneToAppear)}
            })
        }else{
            ArrayToFlash.forEach((Color, ColorIndex) => {
                if (ColorIndex !== 0 && ColorIndex != 1) {
                    setTimeout(() => FlashSingle(Color, false, TimePerEachOneToAppear), (InBetweenTime*(ColorIndex + 1))+(ColorIndex * TimePerEachOneToAppear));
                }else if (ColorIndex == 1) {
                    setTimeout(() => FlashSingle(Color, false, TimePerEachOneToAppear), InBetweenTime + TimePerEachOneToAppear);
                }else{FlashSingle(Color, false, TimePerEachOneToAppear)}
            }) 
        }
        CanClick = true
    }
    const[SequenceOrder, setSequenceOrder] = useState([])
    const[SequenceOrderIndex, setSequenceOrderIndex] = useState(0)
    useEffect(() => {
        const LengthOfOurArray = LengthArray[Stage]
        let CurrentStage = []
        while (CurrentStage.length < LengthOfOurArray) {
            CurrentStage.push(Math.floor(Math.random()*4)+1)
        }
        console.log(CurrentStage)
        setSequenceOrderIndex(0)
        setSequenceOrder(CurrentStage)
        Flash(CurrentStage, false, TimeForEachLightToStayOn, TimeBetweenEachLightToTurnOn)
    }, [Stage])
    const SquaresHeight = "54.55vw"
    function handleClick(ButtonIndex) { //Button Index = 1, 2, 3, 4
        if (CanClick) {
            CanClick = false
            if (ButtonIndex == SequenceOrder[SequenceOrderIndex]) {
                if (SequenceOrderIndex == SequenceOrder.length - 1) {
                    Flash([ButtonIndex, ButtonIndex, ButtonIndex, ButtonIndex], false, 200, 50)
                    setTimeout(() => setStage(Stage + 1), 250*4)
                    console.log("Correct!!")
                    setStage(Stage + 1)
                }
                else {
                    Flash([ButtonIndex, ButtonIndex], false, 200, 50)
                    setSequenceOrderIndex(SequenceOrderIndex + 1)
                    console.log("Getting There!!")
                }
            }else{
                Flash([ButtonIndex], false, 2000, 0)
                setSequenceOrderIndex(0)
                setTimeout(() => {
                    Flash(SequenceOrder, false, TimeForEachLightToStayOn, TimeBetweenEachLightToTurnOn)
                }, 4000);
                console.log("Incorrect")
            }
            CanClick = true
        }
    }
    return (
        <div style = {{"display":"grid", "gridTemplateColumns":"50% 50%"}}>
            <div onClick = {() => handleClick(1)} style = {{"backgroundColor":SquaresColor[0], "height":SquaresHeight}}>  </div>
            <div onClick = {() => handleClick(2)} style = {{"backgroundColor":SquaresColor[1], "height":SquaresHeight}}>  </div>
            <div onClick = {() => handleClick(3)} style = {{"backgroundColor":SquaresColor[2], "height":SquaresHeight}}>  </div>
            <div onClick = {() => handleClick(4)} style = {{"backgroundColor":SquaresColor[3], "height":SquaresHeight}}>  </div>
        </div>
    )
}