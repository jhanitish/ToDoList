import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [ minutes, setMinutes ] = useState(2);
  const [seconds, setSeconds ] =  useState(0);
  const [open, setOpen] = useState(false);
  
  useEffect(()=>{
    let myInterval;
    if(open){
      myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(myInterval)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000)
    return ()=> {
        clearInterval(myInterval);
      };
    } else {
      clearInterval(myInterval);
    }
  }, [open, minutes, seconds]);

  const closeTask = () => {
    setOpen(false);
    setMinutes(2);
    setSeconds(0);
  }

  const createTask = () => {
    const elem = document.getElementById('taskTitle').value;
    const taskElem = document.querySelector('.task-list');

    const classList = minutes === 0 && seconds === 0 ? 'red' : 'green'

    const item = document.createElement('li');
    item.innerText = elem;
    item.classList.add('item-list');
    item.classList.add(classList);
    document.querySelector('.no-task').style.display = 'none'
    taskElem.appendChild(item);

    closeTask();
  }
  return (
      <div className="container">
        <button id="myBtn" className="btn" onClick={() => setOpen(true)}>Create Task</button>

        {
          open ? (
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="close" onClick={closeTask}>&times;</span>
                  <div className="modal-body"> 
                      { minutes === 0 && seconds === 0
                        ? <h1> Create Task in 00:00</h1>
                        : <h1> Create Task in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
                      }
                      <input id="taskTitle" type="text" placeholder={'Enter Title of Task'} />

                      <button className="btn" onClick={createTask}>Submit</button>
                  </div>
              </div>
            </div>
          ) : null
        }

        <ul className="task-list">

        </ul>

        <div className="no-task">Please on above button to start adding task, currently no task added!!!</div>
      </div>
  )
}

export default App;
