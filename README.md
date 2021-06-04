# scheduling-quick
[Tyr it out](https://schedulingquick.com/)

# A web application which finds the common schedules of a group of people for a meeting, gathering, etc.

## Learning Objectives
1. Implement TypeScript in React and Nodejs
2. Test driven development
3. Apply common sorting algorithms and data structures


## How to use
1. Event organizer fills in a simple form, describing the event
<br/>

![image](https://user-images.githubusercontent.com/61986168/117776182-d8002680-b26d-11eb-8f9d-19d60dab61e9.png)
<br/>
2. A link will be generated and the organizer sents it to participants
<br/>

![image](https://user-images.githubusercontent.com/61986168/117776268-f82fe580-b26d-11eb-85d6-3441bc8dab48.png)
<br/>
3. Participants fill in their available schedules
<br/>

![image](https://user-images.githubusercontent.com/61986168/117776326-0847c500-b26e-11eb-9c07-f382f07631b0.png)
<br/>
4. Result is divided into 4 categories <br/>
    a. Time slots meet the requirement and all participants are available <br/>
    b. All participants are available but the time slots **don't** meet the requirement <br/>
    c. Time slots meet the requirement but **NOT** all participants are available <br/>
    d. Time slots **don't** meet the requirement and **NOT** all participants are available <br/>
    
![image](https://user-images.githubusercontent.com/61986168/117776633-5f4d9a00-b26e-11eb-8da3-3731d4cb6ac0.png)
