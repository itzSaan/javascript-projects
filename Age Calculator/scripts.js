let r = document.querySelector('.result') ; 
        
        function getAge(){
            let d = document.getElementById("day").value;        
            let m = document.querySelector('.month').value;
            let y = document.querySelector('.year').value;

            let currentDate = new Date();
            let cy = currentDate.getFullYear();
            let cm = currentDate.getMonth() + 1;
            let cd = currentDate.getDate();
            
            //console.log(cm);
            if(d, m, y == ""){
                r.innerHTML = "Please enter your date of birth.";
            }
            else if(d > 31 || m > 12 || y > cy){
                r.innerHTML = "Please Check your inputs and re-enter values.";
            }
            else{
                let years, months, days = '';
                
                
                if(cd  < d && cm > m && cy > y ){
                    years = cy - y;
                    months = (cm - m) - 1;
                    days = (30 - d) + cd;                  
                } 
                else if(cd < d && cm < m && cy > y ){
                    years = (cy - y) - 1;
                    months = cm + (12 - m) - 1;
                    days = (31 - d) + cd;
                }
                else if(cd > d && cm > m && cy > y ){
                    years = cy - y;
                    months = cm - m;
                    days = cd - d;
                }
                else if(cd > d && cm < m && cy > y ){
                    years = (cy - y) - 1;
                    months = cm + (12 - m);
                    days = cd - d;
                }
                  
                function timeCounter(){
            let date = new Date(); 
                let ch = date.getHours();
            let cmi = date.getMinutes();
            let cs = date.getSeconds();
            let p = document.getElementById('time');
                        ch = (ch == 0) ? ch = 12 : ch;
                        if (ch > 12){
                            ch -= 12;
                        }
                        
                p.innerHTML = `${ch} Hours ${cmi} Minutes ${cs} Seconds`;
                
                setTimeout(timeCounter, 1000);
            }
                
                
                r.innerHTML =   `
                You Lived ${years} years ${months} Months ${days} days 
                    ` ;
                    
                    timeCounter();   
              
                   
            }

            
        }