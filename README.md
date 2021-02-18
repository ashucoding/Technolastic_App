# Technolastic_App

A quiz app created to help job seekers ace JS interview questions. 
Technolastic Javascript is comprised of 10 JS questions. 
Frontend is designed using JS, CSS, HTML.
  CSS stores all the design for a single page application.
  javascript stores all the functionality of quiz
  HTML visual for frontend users. 
  All functionality works together and is connected thru scripts and elements. 
  
App is has a backend - API SqLite3 for database (run rails s -which is /Local 3000/v1/scores)
  Users complete the quiz(frontend) at the end of the quiz user has the option to enter username and record score. 
  Once user has enter username and click submit score the frontend sends a request to the backend for a list of highscores by list using username and user score
 the request then returns a promise which is the top 5 high score. 
 Backend has the ability to create and show scores( 2 of my CRUD functions needed for this project)
 Backend also has a has many/belongs to model. Users has many scores. Scores belongs to users.
