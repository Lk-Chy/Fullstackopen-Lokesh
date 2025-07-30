``` mermaid
sequenceDiagram
  participant User as User
  participant Browser as Browser
  participant Server as Server

  User ->> Browser: Enters the URL 'https://studies.cs.helsinki.fi/exampleapp/notes'
  activate Browser
  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate Server
  Server -->> Browser: HTML document
  deactivate Server
  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate Server
  Server -->> Browser: the css file
  deactivate Server
  Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate Server
  Server -->> Browser: the JavaScript file
  deactivate Server
Browser -->> User: Displays the webpage after loading them on a browser.
  User ->> Browser: Type note and click "Save"
Note right of Browser: JavaScript captures form submit event
 Browser->>Server: POST "exampleapp/new_note" with JSON data
activate Server
Server-->>Browser: Response (e.g. status 200 OK or updated notes)
deactivate Server
Note right of Browser: Browser updates DOM to show the new note
```
