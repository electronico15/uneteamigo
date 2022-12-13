/* function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
} */
function loadClient() {
  gapi.client.setApiKey("AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API ok "); },
            function(err) { console.error("Error loading GAPI client for API error", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.search.list({
    "channelType": "show",
    "location": "cu",
    "maxResults": 10,
    "q": "Smartwatch",
    "regionCode": "eu",
    "relevanceLanguage": "es"
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}
loadClient();
/* 
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
}); */