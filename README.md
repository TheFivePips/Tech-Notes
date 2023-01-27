This is the back end of the techNotes app. It covers Mongodb, express, mongoose, auth with jsonwebtokens and more.

The app is a hypothetical website for a computer repair shop that allows for employees to log in. There are protected routes depending on what type of employee is logged in, and each employee has Notes that indicate a project they are to work on. These notes and employees can be views, edited, updated, created, and deleted by users with the proper credentials.

User Stories for techNotes

    Replace current sticky note system
    Add a public facing page with basic contact info
    Add an employee login to the notes app
    Provide a welcome page after login
    Provide easy navigation
    Display current user and assigned role
    Provide a logout option
    Require users to login at least once per week
    Provide a way to remove employee access asap if needed
    Notes are assigned to specific employees
    Notes have a ticket #, title, note body, created & updated dates
    Notes are either OPEN or COMPLETED
    Users can be Employees, Managers, or Admins
    Notes can only be deleted by Managers or Admins
    Anyone can create a note (when customer checks-in)
    Employees can only view and edit their assigned notes
    Managers and Admins can view, edit, and delete all notes
    Only Managers and Admins can access User Settings
    Only Managers and Admins can create new users
    Desktop mode is most important but should be available in mobile

    Here is a link to the front end: https://github.com/TheFivePips/Tech-Notes-Frontend

This is a code along project by Dave Gray