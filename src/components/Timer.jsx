import { useState } from "react"

export const Timer = () => {
    const [clockSec, setClockSec] = useState("");
    const [timeSpan, setTimeSpan] = useState({});
    const [flag, setFlag] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const setTime = (event) => {
        const {name, value} = event.target; 
        setTimeSpan({
            ...timeSpan,
            [name] : +(value),
        })
    }
    
    const startClock = () => {
        setFlag(false);
        setIsWrong(false);
        if(timeSpan.Start > timeSpan.End)
        {
            setClockSec("");
            return setIsWrong(true);
        }
        setClockSec(timeSpan.Start)
        let id = setInterval(() => {
            setClockSec(p => {
                if(p===timeSpan.End)
                {
                    clearInterval(id);
                    setFlag(true);
                }
                return (p === timeSpan.End ? timeSpan.End : p+1);
            })
        }, 1000)
    }

    return <div style={{margin : "20px 0"}}>{flag && <p style={{color : "red"}}>Time up!</p>}{isWrong && <p style={{color : "red"}}>Wrong input!</p>}Counter : <input style={{width : "20px", textAlign : "center", outline : "none", border : "2px solid brown"}} readOnly="readOnly" value={clockSec}/>
        <div style={{margin : "15px 0"}}>
        <input placeholder="Start time" onChange={setTime} style={{width : "65px", textAlign : "center", outline : "none", border : "2px solid green", margin : "0 5px"}} name="Start"/>
        <input placeholder="End time" onChange={setTime} style={{width : "65px", textAlign : "center", outline : "none", border : "2px solid red", margin : "0 5px"}} name="End"/>
        </div>
        <button onClick={startClock} style={{cursor : "pointer", backgroundColor : "coral", outline : "none"}}>Start Clock</button>
     </div>
}