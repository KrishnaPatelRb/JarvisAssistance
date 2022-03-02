    const oksir = new SpeechSynthesisUtterance("ok ,sir")
    const helloJarvis = new SpeechSynthesisUtterance("hello,sir")
    const finesir = new SpeechSynthesisUtterance("thankyou for asking sir, i am fine")
    const intro = new SpeechSynthesisUtterance("my name is jarvis 2 point zero and mister krishna patel made me")
    const defaults = new SpeechSynthesisUtterance("Sorry sir i did not understand")
    const instacheck = new SpeechSynthesisUtterance("i checked your instagram account ,there is no new message found")
    
    let modifyTranscript;
    let modifyTranscript2;
    let choise;
    let link="https://www.google.co.in/search?q=";
    let noteactive=false;
    let makeWebsite=false;
    let commandactive=true;
    let notewriteactive=0;
    let counterForWebsite=0;
    let instagramOpen;
    let googlOpen;
    let githubOpen;
    let linkedinOpen;
    let newElement;
    let displayWebsiteElement;
    let transcriptArr;
    let notedata="";
    let micLoop=false;
 

    function deActivateJarvis(){
        micLoop=false;
        document.getElementById("stopVoiceCommand").style.display="none"
        document.getElementById("voiceCommand").style.display="inline"
    }

    function homeButtonActive(){
        location.reload();
    }

    
    
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition= new SpeechRecognition();
    var buttonelement=document.getElementById("voiceCommand");
    buttonelement.addEventListener("click",function(){
        recognition.start()
        micLoop=true;
        buttonelement.style.display="none"
        document.getElementById("stopVoiceCommand").style.display="inline"
        setInterval(startRecognitionAgain,2000)
        
    });
 

    
   
        

         
    recognition.onresult=   function results (e) {


        recognition.stop()
        var rawtranscript=e.results[0][0].transcript;
        var transcript=rawtranscript.toLowerCase();
        var textarea=document.getElementById("text")
        textarea.innerHTML=transcript;

        if(transcript.includes("jarvis please open the google and search")){
             modifyTranscript=transcript.slice(0,40)
             modifyTranscript2=transcript.slice(41);
             choise=modifyTranscript
             
        }
        else if(transcript.includes("jarvis what is current weather condition of")){
            modifyTranscript=transcript.slice(0,43)
             modifyTranscript2=transcript.slice(44);
             choise=modifyTranscript
             

          
        }  
        else {
              choise=transcript;
        }

        if(commandactive){

            switch (choise) {
                case "jarvis please write a note for me":
                window.speechSynthesis.speak(oksir)
                noteactive=true;
                break;
                
                case "jarvis what is current time":
                let hours=new Date().getHours()
                let AmOrPm=hours>=12?"pm":"am"
                hours=hours>12?hours-12:hours;
                let minutes=new Date().getMinutes()
                const speech = new SpeechSynthesisUtterance("it is"+hours+" "+minutes+AmOrPm);
                // speech.lang = 'en-us';
                window.speechSynthesis.speak(speech)
                break;

                case ("jarvis what is current weather condition of"):  
                
                let Api="https://api.openweathermap.org/data/2.5/weather?q="
                let ApiID="&units=metric&APPID=9f82a8fd7c98cd1e8b42e2cdecc3f54b"
                let inputValue="indore"
                fetch(Api+modifyTranscript2+ApiID).then(function (response){
                    return response.json();
                    }).then(function(data){
                    

                    if(data.message=="city not found"){
                        let minutes=new Date().getMinutes()
                        const speech = new SpeechSynthesisUtterance("sir, this"+modifyTranscript2+"city is not found");
                        // speech.lang = 'en-us';
                        window.speechSynthesis.speak(speech)
                 
                    }
                    else{
                            temp=data.main.temp+",";
                            maxTemp=data.main.temp_max;
                            minTemp=data.main.temp_min;
                            let minutes=new Date().getMinutes()
                            const speech = new SpeechSynthesisUtterance(" the current temperature of"+modifyTranscript2+"is "+temp+"degree centigrade");
                            // speech.lang = 'en-us';
                            window.speechSynthesis.speak(speech)
                    }  
                })
                break;


                case "please make a website for me":
                case "jarvis please make a website":
                case "jarvis please make a website for me":
                window.speechSynthesis.speak(oksir)
                makeWebsite=true;
                break;

                case "hello jarvis":
                window.speechSynthesis.speak(helloJarvis)
                break;

                case "how are you":
                window.speechSynthesis.speak(finesir)
                break;

                case "what is your name":
                case "jarvis please give me your introduction":
                window.speechSynthesis.speak(intro)
                break;

                case "jarvis please open the google and search":
                window.speechSynthesis.speak(oksir)
                openGoogle();
                break;

                case "jarvis please delete this google":
                case "jarvis please close this google":
                window.speechSynthesis.speak(oksir)
                closeGoogle();
                break;

    
                case "jarvis please open the github":
                window.speechSynthesis.speak(oksir)
                openGithub();
                break;

                case "jarvis please close this github":
                window.speechSynthesis.speak(oksir)
                closeGithub();
                break;


                case "jarvis please open the linkedin":
                window.speechSynthesis.speak(oksir)
                   openLinkedin();
                break;
                
                case "jarvis please close this linkedin":
                window.speechSynthesis.speak(oksir)
                    closeLinkedin()
                break;

                case "jarvis please open the instagram":
                window.speechSynthesis.speak(oksir)
                    openInstagram();
        
                break;
                    
                case "jarvis please close this instagram": 
                window.speechSynthesis.speak(oksir)
                    closeInstagram();
                    
                break;

                default:
                window.speechSynthesis.speak(defaults)
                    break;
            }
        }
        // for notes
        if(noteactive){
            commandactive=false;
            let noteArea=document.getElementById("note")
            noteArea.style.display="inline-block"
            notewriteactive++;
        }

        if(notewriteactive>1) {
           notedata=notedata+" "+transcript;
           document.getElementById("note").innerHTML=notedata;
           if(transcript==="jarvis please remove this notes" || transcript=="jarvis please remove this not" || transcript.includes("jarvis please remove this")){
                window.speechSynthesis.speak(oksir)
                document.getElementById("note").innerHTML="";
                document.getElementById("note").style.display="none";
                commandactive=true;
                noteactive=false;
                notewriteactive=0;    
            }
        }
        //for website
        if(makeWebsite){
            commandactive=false;
            let websiteHtmlElement=document.getElementById("websiteHtml");
            websiteHtmlElement.style.display="inline-block";
            displayWebsiteElement=document.getElementById("displayWebsite");
            displayWebsiteElement.style.display="inline-block";
            counterForWebsite++;
        }
        if(counterForWebsite>1){
            if(transcript.includes("delete all")){
                document.getElementById("websiteHtml").innerHTML=""
                document.getElementById("displayWebsite").innerHTML=""
                transcriptArr=""
                transcript=""
            }

            if(transcript.includes("delete")){
                let currentinnerHtml=document.getElementById("websiteHtml").textContent;
                 let newinnhtml=currentinnerHtml.slice(0,-1)
                 console.log(newinnhtml)
                document.getElementById("websiteHtml").textContent=newinnhtml
                document.getElementById("displayWebsite").innerHTML=""
                transcriptArr=""
                transcript=""
            }
            
            transcriptArr=transcript.split(" ");
            let element=transcriptArr[1];
            let id=transcriptArr[3]
            transcriptArr.shift();
            transcriptArr.shift();
            transcriptArr.shift();
            transcriptArr.shift();
            transcript=transcriptArr.toString();
        
            if(element.includes("diva")){
                let newElement=element.substring(0,element.length-1)
                element=newElement;
            }

            
            const innerHtml=document.getElementById("websiteHtml").innerHTML;
            document.getElementById("websiteHtml").innerHTML=innerHtml+"<"+element+" "+"id=\""+id+"\""+">"+transcript.replace(/,/g," ")+"<"+"/"+element+">";
            function makeElements(){
                let createdElement=document.createElement(element)
                displayWebsiteElement.appendChild(createdElement)
                createdElement.innerHTML=transcript.replace(/,/g," ")
            }
            makeElements()

            
        }




             
        // recognition.stop()
            // startRecognitionAgain()
        // setInterval(startRecognitionAgain,3000)
        
        
    }

    //setInterval(startRecognitionAgain,3000)

    function startRecognitionAgain(){
      if(!speechSynthesis.speaking && micLoop) {
        recognition.start()
      }
    }

    function closeInstagram(){
        instagramOpen.close()
        
    }
    function openInstagram(){
        instagramOpen= window.open(link+"instagram")
    }
    function closeGoogle(){
        googleOpen.close()
    }
    function openGoogle(){
        googleOpen= window.open(link+modifyTranscript2)
    }
    function closeGithub(){
        githubOpen.close()
    }
    function openGithub(){
        githubOpen= window.open("https://GitHub.com/")
    }
    function closeLinkedin(){
        linkedinOpen.close()
    }
    function openLinkedin(){
        linkedinOpen= window.open("https://LinkedIn.com/")
    }
   