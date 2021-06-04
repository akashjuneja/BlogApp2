const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

exports.createUser= async (request, reply) => {
	const { username, password: plainTextPassword ,fname,lname,mobile,address } = request.body
	console.log(request.body);

	if (!username || typeof username !== 'string') {
		return reply.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return reply.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return reply.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password,
			fname,
			lname,
			mobile,
			address
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return reply.json({ status: 'error', error: 'Username already in use' })
		}
        console.log(error);
		throw error
	}

	reply.send({ status: 'ok' })
}

//login request
exports.loginUser= async (request, reply) => {
    try{
        const { username, password } = request.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return reply.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		reply.headers({'set-cookie':'cookie',
	     'token':token})
        
		return reply.send(`token ${token}`)
	}

	reply.json({ status: 'error', error: 'Invalid username/password' })

    }catch(error){
           throw error
    }
	
}
