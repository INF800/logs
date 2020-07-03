const pass = document.getElementsByClassName('pass')

// mobile /desktop
if ( ( window.innerWidth > 800 ) && ( window.innerHeight > 600)) {
    // desktop 
} else {
    // mob
    for (let i=0; i<pass.length; i++){
        pass[i].style.width = "80%"
    }   
}



// get entered logs
const saveLog       = document.getElementById('save-log')
//const pw1           = document.getElementById('pw1')
const pw2           = document.getElementById('pw2')
const head          = document.getElementById('head')
const log           = document.getElementById('log')

const width70       = document.getElementsByClassName('width-70')
const dispLogs      = document.getElementsByClassName('display-logs-width-90')
const dispDates      = document.getElementsByClassName('disp-date')

const save = () => {
    console.log('saving')
    if ((pw1.value === '') || (pw2.value === '')){
        alert('Please enter password')
    }
    if (pw1.value != pw2.value){
        alert('Entered passwords are different')
    } else {
        curDate     = new Date;
        inDate      = curDate.toString()
        inHead      = head.value
        inLog       = encryptData(log.value, pw1.value).toString()
        inList = [{
            date        : inDate,
            head        : inHead,
            log         : inLog
        }]
        operation(type="putData", dataList=inList)   
    }
}

const viewLogs = () => {
    console.log('displaying logs')
    
    if ((pw1.value === '') || (pw2.value === '')){
        alert('Please enter password')
    }
    else if (pw1.value != pw2.value){
        alert('Entered passwords are different')
    } else {
        // clrscr
        for (let i=0; i<width70.length; i++){
            width70[i].style.display = 'none'
        }
        // un-clrscr
        for (let i=0; i<dispLogs.length; i++){
            dispLogs[i].style.display = 'block'
        }
        

        operation(type="getAll")
    }
}


