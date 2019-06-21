App idea from: [https://github.com/circusstreet/react-task](https://github.com/circusstreet/react-task)

Fullstack boilerplate from: [https://github.com/crsandeep/simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)
# Manage Jargon App
Here are some user stories that describe some functionality of a React/Redux app, enabling a user to add, edit and delete 'jargon' items from the database.

## Read
As an admin I want to see all available 'jargon' terms in the database

## Add
As an admin I want to add a new 'jargon' item to the database.

### Acceptance Criteria:
+ Form should disable if input is invalid - name or description field empty or 'jargon' name already exists
+ Users should be reminded of existing jargon terms that match the name input field.
+ User should see a warning if they attempt to enter an item matching one that already exists.

## Edit
As an admin I want to edit an existing 'jargon' term.

### Acceptance Criteria:
+ During editing, user should be able to cancel changes and return to original term
+ During editing, user should be presented with save and cancel options

## Delete
As an admin, I want to delete an existing 'jargon' term.

### Acceptance Criteria:
+ User should be prompted to confirm if they choose to delete

## Assets
In the screens directory, you can see some screenshots which show the system in action.
Should you need them, in the data directory there is a json data file containing all jargon items.