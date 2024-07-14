# Environment variables
`SHORT_TIME_CODE_API_ORIGIN` - the "short-time-code" app origin. The "short-time-code" app is required.
`HTTP_SERVER_PORT` - the port on which the http server listens (80 by default)
`NO_DOTENV` - can be set to "1" to avoid configuring with "dotenv" module. If not specified the "dotenv" module is
running by default

#Dotenv
`.env` file can be created in the "src" folder (the same folder as server.js is located) to configure with "dotenv"
module
