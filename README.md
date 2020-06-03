# hiit-trainer
### **[https://hiit-workout-app.herokuapp.com/](https://hiit-workout-app.herokuapp.com/)**

Customizable High-Intensity-Interval-Training timer with pre-set workouts.

## Technology
- Server: Flask
- Client:
    - Vue.js CLI
    - Vue Router
    - Vue Store

## Scope
### Part 1
- Allow user to plan schedule of activities (exercises, rests, reps)
- Allow user to determine time for each activity
- Total values and create a countdown timer

### Part 2
- Have preset timers with exercises associated with them


## Deploying
### [Create Heroku Remote](https://devcenter.heroku.com/articles/git#prerequisites-install-git-and-the-heroku-cli)
For an existing Heroku app, add a remote to your local repository with the heroku git:remote command with the app’s name:

```bash
heroku git:remote -a <my-app>
> sets git remote heroku to https://git.heroku.com/my-app.git
```

### [Docker Deploy](https://devcenter.heroku.com/articles/container-registry-and-runtime#getting-started)

Log in to Container Registry:
```bash
heroku container:login
```

Build the image and push to Container Registry:
```bash
heroku container:push web
```

Then release the image to your app:
```bash
heroku container:release web
```

Now open the app in your browser:
```bash
heroku open
```

#### *Pipeline now created through GitLab*


## Resources
[Developing a Single Page App with Flask and Vue.js](https://testdriven.io/blog/developing-a-single-page-app-with-flask-and-vuejs/)

[Deploying a Flask and Vue App to Heroku with Docker and Gitlab CI](https://testdriven.io/blog/deploying-flask-to-heroku-with-docker-and-gitlab/)

[Build Mobile App with Vue](https://www.nativescript.org/vue)
