const fastify = require('fastify')({ logger: true });
const mongoose =require('mongoose');
const routes=require('./routes/user');
const postRoutes= require('./routes/posts');


//DB Connection
mongoose.connect('mongodb://localhost:27017/fastifyLogin', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

//Get Request sample
fastify.get('/', async (request, reply) => {

  return { hello: 'world' }
})
//port
const PORT=8000;

//routes array ,for all the routes
routes.forEach((route,index)=>{
    fastify.route(route);
})

postRoutes.forEach((route,index)=>{
    fastify.route(route);
})



// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()