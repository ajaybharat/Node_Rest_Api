# Node_Rest_Api

Social media API built using nodejs, mongodb

1. Users api
2. Posts api

## To run the project locally

1. Clone repo (main)

2. npm install ( to install dependencies)

3. npm start

4. Browse http://localhost:4000/api/users, http://localhost:4000/api/posts to get all users and posts

## Deployed Demo link:

1. https://node-rest-api7.herokuapp.com/api/users
2. https://node-rest-api7.herokuapp.com/api/posts

## To run the Demo link (Sample links)

#Authentication

1. Register user: https://node-rest-api7.herokuapp.com/api/auth ( body: email,name,password,phone )
2. Login user: https://node-rest-api7.herokuapp.com/api/auth ( body: email,password )

#Users:

1. Get all users: https://node-rest-api7.herokuapp.com/api/users
2. Get all posts for specified user: https://node-rest-api7.herokuapp.com/api/users/616af5f59c52b25b54550701/posts
3. Patch/Delete/Get Specified User: https://node-rest-api7.herokuapp.com/api/users/616af5f59c52b25b54550701
4. Follow user: https://node-rest-api7.herokuapp.com/api/users/616af5f59c52b25b54550701/follow ( body: userid )
5. unfollow user: https://node-rest-api7.herokuapp.com/api/users/616af5f59c52b25b54550701/unfollow ( body: userid )

#Posts:

1. Get all posts: https://node-rest-api7.herokuapp.com/api/posts
2. Post the posts with userid : https://node-rest-api7.herokuapp.com/api/posts/616af5f59c52b25b54550701
3. Patch/Delete/Get specified Post: https://node-rest-api7.herokuapp.com/api/posts/616af65f9c52b25b54550706
4. Like and dislike post: https://node-rest-api7.herokuapp.com/api/posts/616af65f9c52b25b54550706/likeUnlike **(body: { "userid": "616af5f59c52b25b54550701" } )**
5. Get all timeline posts: https://node-rest-api7.herokuapp.com/api/posts/timeline/all **(body: { "userid": "616af5f59c52b25b54550701" } )**
