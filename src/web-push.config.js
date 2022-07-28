import { BASE_URL } from "./Api_connection/config"
// import { useSelector} from "react-redux";

// const { user} = useSelector(
//   (state) => state.user.value
// );
// const email = user?.email;
// console.log(email, "::EMAIL FROM PUSH");
  console.log("amit");
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
let abortController =new AbortController();
function sendSubscription(subscription, email) {
  abortController.abort();
  abortController =new AbortController();
  console.log("API CALEED", email);
  return fetch(`${BASE_URL}/notifications/subscribe`, {
    method: 'POST',
    signal:abortController.signal,
    body: JSON.stringify({
      email: email,
      subscription:subscription, 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//conditional render
let clicked = true

export function subscribeUser(convertedVapidKey, email) {
  console.log(convertedVapidKey, email, "IN Suscribe function");
    convertedVapidKey=urlBase64ToUint8Array(convertedVapidKey);

  if(clicked) {
  if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      
      registration.pushManager.getSubscription().then(function(existedSubscription) {
        console.log(existedSubscription, "existed Subscription");
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.', convertedVapidKey)
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {
             console.log('New subscription added.',newSubscription)
            sendSubscription(newSubscription,email)
          }).catch(function(e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.', existedSubscription)
          sendSubscription(existedSubscription, email)
        }
      })
    })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}else{
console.log('Can not reachable to the service worker');
}}