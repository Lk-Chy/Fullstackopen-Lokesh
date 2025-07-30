```mermaid
sequenceDiagram
  participant User as User
  participant Browser as Browser
  participant Server as Server

  User ->> Browser: Enters the URL 'https://studies.cs.helsinki.fi/exampleapp/spa'
  activate Browser
  Browser ->> Server: GET /exampleapp/spa
  activate Server
  Server -->> Browser: HTML document (includes SPA shell)
  deactivate Server

  Browser ->> Server: GET /exampleapp/main.css
  activate Server
  Server -->> Browser: CSS file
  deactivate Server

  Browser ->> Server: GET /exampleapp/spa.js
  activate Server
  Server -->> Browser: JavaScript file (SPA logic)
  deactivate Server

  Note right of Browser: JS fetches notes via AJAX
  Browser ->> Server: GET /exampleapp/data.json
  activate Server
  Server -->> Browser: JSON data (notes)
  deactivate Server

  Browser -->> User: Renders notes dynamically in DOM

  User ->> Browser: Type note and click "Save"
  Note right of Browser: JS captures form submit event
  Browser ->> Server: POST /exampleapp/new_note_spa with JSON
  activate Server
  Server -->> Browser: Response (e.g. status 200 OK)
  deactivate Server

  Note right of Browser: JS updates DOM with new note (no page reload)
  ```