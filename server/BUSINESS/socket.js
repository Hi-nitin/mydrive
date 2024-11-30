const { Server } = require('socket.io');
const urii=require('./url')

const Mysocket = (server) => {
    const io = new Server(server, {
 cors: {
    origin: "https://mydrive-ruby.vercel.app",  // The allowed origin (your frontend URL)
    methods: ["GET", "POST"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type"],  // Allowed headers (optional)
    credentials: true,  // Allow cookies and other credentials (optional)
  }
    });


    io.on('connection', (socket) => {
        console.log('a user connected ' + socket.id);

        socket.on('client-message', (msg,fid,sid) => {

            io.emit('msgtoclient', msg,fid,sid);
           
            

        })


        socket.on('disconnect', () => {
            console.log('user disconnected' + socket.id);
        });
    });

}

module.exports = Mysocket
