import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


var swRegistration,permission;
    
const requestNotificationPermission = async () => {
    permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }

    if ('serviceWorker' in navigator) {
        console.log('registering')
          navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
            // Registration was successful
            swRegistration = registration;
            console.log('ServiceWorker registration successful with scope: ', swRegistration.scope);
            console.log('push permission', permission)
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
        
      } else {
          console.log('no sw')
      }
}

requestNotificationPermission()