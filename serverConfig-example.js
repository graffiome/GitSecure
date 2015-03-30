// DO NOT PUT REAL KEYS IN THIS FILE, IT IS FOR DEMONSTRATION PURPOSES ONLY!!!
// CREATE A serverConfig.js LOCALLY WITH YOUR INFO

// Githup ClientID, ClientSecret and CallbackURL
exports.clientID = 'your client id';
exports.clientSecret = 'your client secret';
exports.callbackURL = 'your callbackURL [http://123.123.123.123:3000/auth/github/callback]';
exports.gitHooksCallbackURL = 'your URL for Git to send hooks notifications [http://123.123.123.123:8080]';
// when running on a LAN with a router, the URLs above need your public IP (can get from google), GitHub will not register a hook to 'localhost'
// the localHost value below will either be your public IP address, or potentially your unique IP within your personal LAN
exports.localHost = 'your local host (could be localhost or an ip address) [123.123.123.123 OR ~192.168.X.X]';
// port for the server to receive notifications from GitHub on repo update (and registering the initial hook)
exports.hookServerPort = 8080;
// port to visit the app itself
exports.appServerPort = 3000;