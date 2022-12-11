#CS411 Final Project

Idea: Our aaplication we have called Foodies allows users who login through Google
to enter a city of their choice. Once their city is entered the top 5 rated restaurants 
are displayed to the user along with a picture of their top dish. The user can then enter 
a meal or components of a meal into another section in which an alert of nutrition 
information such as serving size and calories appears.


https://user-images.githubusercontent.com/114755382/206929094-ec19f0fc-61f6-44a4-837b-ff0d937ca60b.mp4


Technology Stack:
1. Third party authorization using OAuth is done with the Google Login.
We used Google because we felt that it was a common plateform used and many people 
already have a Google account/email.
2. A MongoDB database is used to store our logged in user information.
We used this structure due to it being schemaless and it allows the types of data 
that are stored to evolve overtime. Also, the key-value pair stores allows you to put 
whatever you like in the value.
3. The Yelp API is used to gather the top 5 rated restaurants for the city entered.
4. The Nutritionix API is used to gather the nutrition information for the meal entered.
5. Frontend is configured using Node and React environments. We found these to be the 
best for our application due to their relative compatibility with eachother and we preferred 
to use JavaScript as our main language.
6. Backend was configured using Python Flask environments. We found this was the best 
environment to connect the frontend and backend smoothly for request and returning of data.  
