import { useEffect, useState } from "react"

export const Todo = () => {
    const [text, setText] = useState("");
    const [task, setTask] = useState([]);
    const [page, setPage] = useState(1);
    const reflectChange = (e) => {
        setText(e.target.value);
    }

       let getData = async() => {
        try {
            let res = await fetch(`http://localhost:3005/task?_page=${page}&_limit=3`);
            let data = await res.json();
            setTask([...data]);
        } catch(e) {
            console.log(e);
        }
       }
       
    useEffect(() => {
        getData();
    },[page]);

    const addTask = async() => {
        let payload = {
            title : text
        }
        await fetch("http://localhost:3005/task", {
            method : "POST",
            body : JSON.stringify(payload),
            headers : {
                "content-type" : "application/json"
            }
        })
        setText("");
        getData();
    }
    return <div>
        <input placeholder="Task" value={text} onChange={reflectChange}/>
        <button onClick={addTask}>Create</button>
        {task.map((e,i) => {
            return <div key={i}>{e.title}</div>
        })}
        <button disabled={page === 1} onClick={() => {
            setPage(page-1);
        }}>Prev</button>
        <button onClick={() => {
            setPage(page+1);
        }}>Next</button>
    </div>
}