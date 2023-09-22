let [sceonds, minuts, hours] = [0, 0, 0];
let displayTime = document.getElementById('displayTime')
let timer = null

function stopwatch() {
    sceonds++
    if (sceonds == 60) {
        sceonds = 0
        minuts++
        if (minuts == 0) {
            hours++

        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = hours < 10 ? "0" + minuts : minuts;
    let s = hours < 10 ? "0" + sceonds : sceonds;
    displayTime.innerHTML = h + ":" + m + ":" + s

}
function watchStart() {
    if (timer == null) {
        setInterval(timer, 1000)

    }
    timer = setInterval(stopwatch, 1000)

}
function watchStop() {
    clearInterval(timer)
}
function wathcReset(){
    clearInterval(timer) 
    // [sceonds, minuts, hours] = [0, 0, 0];
    sceonds =0
    minuts =0
    hours=0
    displayTime.innerHTML="00:00:00"
}