import fetchProductive from "./api/isProductive.js";

const ALARM_JOB_NAME = "DROP_ALARM";

chrome.runtime.onMessage.addListener((data)=>{
        console.log("OnStart in BACKGROND");
        switch(data.event){
            case 'onStart':
                //console.log("duration received: ", data.duration);
                createAlarm(data);
                let data2 = {
                    "previousActivity": 69,
                    "zoneOuts": 0
                }
                chrome.storage.local.set(data2)
                break;
            case 'onStop':
                console.log("Onstop WA SPRESSED");
                stopAlarm();
                break;
            default:
                break;
        }   
})

const createAlarm = (data) => {
    console.log("ALARM STARTED")
    chrome.alarms.create(ALARM_JOB_NAME, {periodInMinutes: 1.0})
    setTimeout(function() {
        console.log("ALARM CLOSED AFTER 10 SECS");
        chrome.alarms.clearAll();
      }, (data.hour * 60 * 60) + (data.min * 60) * 1000);
}

const stopAlarm = () => {
    console.log("ALARM STOPPED")
    chrome.alarms.clearAll()
}

chrome.alarms.onAlarm.addListener(async () => {
    console.log("ATTENTIONNNN onAlarm scheduled code running...")

    let currentActivity ;
    currentActivity = await fetchProductive();
    console.log("Current Word Count: " + currentActivity);

    chrome.storage.local.get(["previousActivity", "zoneOuts"], (result) => {
        const {previousActivity, zoneOuts} = result;

        console.log("previousActivity " + previousActivity)
        console.log("zoneOuts " + zoneOuts)
        
        console.log("wprd count of current doc in background.js " + currentActivity);
    
        if (Math.abs(currentActivity - previousActivity) <= 10){ //Absolute to consider possibity of user reducing word count and not increasing
            zoneOuts = zoneOuts + 1
        }
    
        let data2 = {
            "previousActivity": currentActivity,
            "zoneOuts": zoneOuts
        }
        chrome.storage.local.set(data2)
    })

})