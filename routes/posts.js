const postcontroller= require('../controllers/posts');

const routes=[{
     method: 'POST',
    url: '/api/createPost',
    handler:postcontroller.createPosts
},{
    method: 'GET',
    url: '/api/getPosts',
    handler:postcontroller.getPosts
},{
     method: 'DELETE',
    url: '/api/deletePosts/:id',
    handler:postcontroller.deletePost
},{
    method: 'PUT',
    url: '/api/updatePosts/:id',
    handler:postcontroller.updatePost
}]

module.exports=routes;