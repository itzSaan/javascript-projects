
        let min = 0, sec = 0, milisec = 0, ltarr = [];
        var stopwatch = true;
        let startBtn = document.getElementById('start');
        let resetBtn = document.getElementById('reset');
        let lapBtn = document.getElementById('lap');
        let pauseBtn = document.getElementById('pause');
        let lapTimeList = document.getElementById('lapTimeList');
        let timer = document.getElementById('timer');
        
        timer.innerHTML = "00:00.00";

        function stopStopwatch(){
            if(stopwatch == false){
                stopwatch = true;                
                startBtn.style.display = "block";
                startBtn.innerText = "Resume";
                resetBtn.style.display = "block";
                pauseBtn.style.display = "none";
                lapBtn.style.display = "none";
            }                     
        }

        function startStopwatch(){
            //debugger;
            if(stopwatch == true){
                stopwatch = false;
                startTimer();
                startBtn.style.display = "none";
                lapBtn.style.display = "block";              
                if(startBtn.innerText = "Resume"){
                    startBtn.innerText = "Start";
                    pauseBtn.style.display = "block";
                    resetBtn.style.display = "none";
                }
            }            
        }

        function resetStopwatch(){
            stopwatch = true;
            min = 0; sec = 0; milisec = 0;           
            timer.innerHTML = "00:00.00";
            lapTimeList.innerHTML = '';
            startBtn.innerText = "Start";
            pauseBtn.style.display = "none";
            startBtn.style.display = "block";
            resetBtn.style.display = "none";

        }
        function lapTime(){    
           //debugger;
                let lapTime = document.createElement('div');
                lapTime.classList.add('laptime')
                let sno = document.createElement('span');
                let time = document.createElement('span');
                let timeDiff = document.createElement('span');
                time.innerText = `${min}:${sec}.${milisec}`;
                let t = `${min}${sec}${milisec}`;
                
                ltarr.push(t);                
                 for(let i = 0; i < ltarr.length; i++){
                    sno.innerText = i + 1; 
                    if(i > 1){
                        let a = parseFloat(ltarr[i]);
                        let b = parseFloat(ltarr[i++]);
                        console.log(b - a);
                    } else{ console.log(ltarr[0])}
                    //console.log(parseFloat(ltarr[i]));                                   
                }
                
                //timeDiff.innerText = parseInt();
                lapTime.appendChild(sno);
                lapTime.appendChild(time);
                lapTime.appendChild(timeDiff);
                lapTimeList.appendChild(lapTime);                            
                
                  //console.log(ltarr);      
        }
            
        function startTimer() {  
            if(stopwatch == false){
                milisec = parseInt(milisec);
                sec = parseInt(sec);
                min = parseInt(min);
                milisec++;
            if(milisec == 100){
                sec++;
                milisec = 0;
            }
            if(sec == 60){
                min++;
                sec = 0;
            }
            milisec = (milisec < 10) ? "0" + milisec : milisec;
            sec = (sec < 10) ? "0" + sec : sec;
            min = (min < 10) ? "0" + min : min;

            document.getElementById('timer').innerHTML = min + ':' + sec + '.' + milisec;            

            setTimeout(startTimer, 10);

            }           
        }
 
        document.getElementById('start').addEventListener('click', startStopwatch);        
        document.getElementById('pause').addEventListener('click', stopStopwatch); 
        document.getElementById('reset').addEventListener('click', resetStopwatch);
        document.getElementById('lap').addEventListener('click', lapTime);
        