/**
 * SendData to LS
 * @param {*} key 
 * @param {*} data 
 */
const sendDataLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * GetData from LS
 * @param {*} key 
 * @returns 
 */
const getDataLS = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
  return []
}

/**
 * number check 
 * @param {*} num 
 * @returns 
 */


const isNum = (num) => {
  pattern = /^[0-9]{3,}$/
  return pattern.test(num)
}


/**
 * create alert
 * @param {*} msg 
 * @param {*} type 
 * @returns 
 */
const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} alert-dismissible fade show" role="alert">
${msg}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</p>`
}


/**
 * time ago
 * @param {*} date 
 * @returns 
 */
function timeAgo(date) {
  const currentDate = new Date();
  const timestamp = date instanceof Date ? date.getTime() : new Date(date).getTime();
  const elapsed = currentDate - timestamp;

  if (elapsed < 1000) {
    return 'just now';
  } else if (elapsed < 60000) {
    const seconds = Math.floor(elapsed / 1000);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  } else if (elapsed < 3600000) {
    const minutes = Math.floor(elapsed / 60000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (elapsed < 86400000) {
    const hours = Math.floor(elapsed / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (elapsed < 2592000000) {
    const days = Math.floor(elapsed / 86400000);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (elapsed < 31536000000) {
    const months = Math.floor(elapsed / 2592000000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(elapsed / 31536000000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}



/**
 * unique id
 */

const randomUniqueId = (length = 20) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const idArray = [];
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    idArray.push(randomChar);
  }
  
  const uniqueId = idArray.join('');
  return uniqueId;
}