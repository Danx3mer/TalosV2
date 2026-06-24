# TalosV2
<hr>
## What is Talos V2?
This was originally my school's final project aimed at testing one's web development skills. For this project the only requirements were that we were to use python's cgi (common gateway interface) tools in order to retrieve data found in a form that a user would fill out.
I decided to create a scaled down version of my school's directory management system, called Talos (hence the name, Talos V2).

## How does this project work?
The first version of the project was tailored towards the rubric that my CS teacher provided us for the final project, and as such uses no fancy frameworks or outside APIs to enhance the development experience. The main flow for how the user was planned to interact with this project was to fill out a form, which would then be parsed via using python's cgi library to then create a cookie stored on the user's device for a day. Javascript would then be utilized to read the cookie and update the webpage based off of the contents of the cookie. Regular CSS was used to style the website. The whole thing is being hosted on my school's apache server, which allows for execution of cgi scripts under an older version of python. Finally, 2 JSON databases were utilized to store user data throughout sessions.

## What's next?
Python CGI is outdated. The final version of this project will look something like this:
- No CGI, instead using javascript for handling form updates
- Instead of just using HTML, I will be utilizing React.js for the layout of the website
- Instead of regular CSS, I will be utilizing tailwind CSS for the styling of the website
- Instead of 2 JSON files, I will be using SupaBase to save the data
