import {
  REGISTER_ACTION,
  LOGIN_ACTION,
  REGISTER_WEB_PUSH,
  INCOMING_POST_ACTION,
  FILTER_ACTION
} from "./actionTypes";

/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function registerWebPush(enable) {
  return (dispatch, getState) => {
    
    if ("serviceWorker" in navigator) {
      return window.Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Permission not granted for Notification");
          return dispatch( {
            type: REGISTER_WEB_PUSH,
            payload: { enabled: false }
          });
        }

        console.log("registering");
        return navigator.serviceWorker.register("/service-worker.js").then(
          function(registration) {
            console.log(registration)
            if (!enable) {
              registration.unregister();
              return dispatch( {
                type: REGISTER_WEB_PUSH,
                payload: { enabled: false }
              });
              
            }
            const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                'BIk8YK3iWC3BfMt3GLEghzY4v5GwaZsTWKxDKm-FZry3Nx2E_q-4VW3501DkQ5TX1Pe7c3yIsajUk9hQAo3sT-0'
              )
            };
            
            console.log("subscribing", subscribeOptions);

            return registration.pushManager.subscribe(subscribeOptions).then((pushSubscription)=>{
              var subscription = {
                endpoint:pushSubscription.endpoint,
                keys: {
                  p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(pushSubscription.getKey('p256dh')))),
                  auth:btoa(String.fromCharCode.apply(null, new Uint8Array(pushSubscription.getKey('auth')))),
                }
              }
              console.log( subscription);

              return fetch("http://localhost:8080/push", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json; charset=utf-8"
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(subscription)
              }).then(ignore => {
                return dispatch( {
                  type: REGISTER_WEB_PUSH,
                  payload: { enabled: permission === "granted" }
                });
              }).catch((err)=> {
                console.log(err)
                return dispatch( {
                  type: REGISTER_WEB_PUSH,
                  payload: { enabled: false }
                });
              });;
            }).catch((err)=> {
              console.log(err)
              return dispatch( {
                type: REGISTER_WEB_PUSH,
                payload: { enabled: false }
              });
            });

          },
          function(err) {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
            return dispatch( {
              type: REGISTER_WEB_PUSH,
              payload: { enabled: false }
            });
          }
        );
      });
    } else {
      console.log("no sw");
      return dispatch( {
        type: REGISTER_WEB_PUSH,
        payload: { enabled: false }
      });
    }
  };
}

function incomingPost(posts) {
  return {
    type: INCOMING_POST_ACTION,
    payload: posts
  };
}

export function filter(filter) {
  return {
    type: FILTER_ACTION,
    payload: filter
  };
}

export function post(author, text) {
  return (dispatch, getState) => {
    return fetch("http://localhost:8080/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ author, text })
    }).then(ignore => {
      const currentFilter = getState().filter;
      if (currentFilter.startsWith("#")) {
        dispatch(fetchPosts({ tag: currentFilter }));
      } else if (currentFilter.length == 0) {
        dispatch(fetchPosts());
      } else {
        dispatch(fetchPosts({ author: currentFilter }));
      }
    });
  };
}

export function fetchPosts(options = {}) {
  return dispatch => {
    if (options.tag) {
      return fetch(
        `http://localhost:8080/posts/tags/${options.tag.split("#")[1]}`
      )
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    } else if (options.author) {
      return fetch(`http://localhost:8080/posts/author/${options.author}`)
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    } else {
      return fetch(`http://localhost:8080/posts`)
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    }
  };
}

export function register(userName, password) {
  return {
    type: REGISTER_ACTION,
    payload: {
      username: userName,
      password: password
    }
  };
}

export function login(userName, password) {
  return {
    type: LOGIN_ACTION,
    payload: {
      username: userName,
      password: password
    }
  };
}
