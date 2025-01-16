const db = require('./connection');
const argon2 = require('argon2');

const User = require('../models/User'); 
const Todo = require('../models/Todo'); 

const seedUserTodo=async()=>{
    try {
        await User.deleteMany();
        await Todo.deleteMany();
        const hashedPassword1 = await argon2.hash('Password123!');
        const hashedPassword2 = await argon2.hash('Password456!');
        const user1 = new User({
          username: 'johndoe',
          password: hashedPassword1, 
        });
        const user2 = new User({
          username: 'janesmith',   
          password: hashedPassword2,
        });
    
        await user1.save();
        await user2.save();
    
        const todo1 = new Todo({
          user: user1._id,
          name: 'Buy groceries',
          complete: false,
        });
        const todo2 = new Todo({
          user: user1._id,
          name: 'Walk the dog',
          complete: true,
        });
        const todo3 = new Todo({
          user: user2._id,
          name: 'Complete homework',
          complete: false,
        });
    
        await todo1.save();
        await todo2.save();
        await todo3.save();
    }catch (error) {
        console.error('Error seeding:', error);
    } finally {
        await db.close();
    }
}


seedUserTodo()