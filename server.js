const PORT = process.env.PORT || 3003;
const message = `listening on port ${PORT}`;
require('./app').listen(PORT, ()=> console.log(message));
