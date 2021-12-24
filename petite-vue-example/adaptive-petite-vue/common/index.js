const STATUS_MAP = {
  "notstarted": "не\u00A0начата",
  "inprogress": "в\u00A0прогрессе",
  "done": "сделана",
}
async function moveToStatus(key, status) {
  try {
    // Call API
    console.log("move %s to %s", key, status)
    //return success
    return true
  } catch(e) {
    //return failure
    return false
  }
}

