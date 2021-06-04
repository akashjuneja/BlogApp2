const Posts=require('../models/posts');

//API to Create Posts
exports.createPosts= async(request ,reply)=>{
    try{
    const {title,created_by,detailed_text,date_of_post}=request.body;
    const res= await Posts.create({
        title,
        created_by,
        detailed_text,
        date_of_post

    })
    console.log(`Post Created ${res}`);
    reply.send({status:"ok"})
    }catch(error){
        throw error;

    }

}

//API to get all POSTS

exports.getPosts= async (request, reply)=>{
    try{
         await Posts.find({},(err, posts)=>{
                let postMap={}; 
                posts.forEach((post1)=>{
                   postMap[post1._id]=post1;
                });
                 reply.send(postMap);
         })
        

    }catch(error){
        throw error;
    }
}

//API to DELETE POSTS

exports.deletePost= async(request , reply)=>{
    try{
        const id=request.params.id;
        const post= await Posts.findByIdAndDelete(id);
        reply.send({status:"deleted"});
        return post;
    }catch(error){
            throw error;
    }
}

//API to update Post

exports.updatePost= async(request, reply)=>{
    try {
        const id=request.params.id;
        const newPost=request.body;
        const {...modifiedImage}=newPost;
        const updatePost= await Posts.findByIdAndUpdate(id, modifiedImage,{new:true});
        reply.send({status:"updated"});
        return updatePost;
    }catch(error){
            throw error;
    }
}