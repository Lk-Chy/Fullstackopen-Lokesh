```mermaid
sequenceDiagram
  participant User as User
  participant Browser as Browser
  participant Server as Server

  User ->> Browser: Fill in note text and click "Save"
  Note right of Browser: JS intercepts form submission

  Browser ->> Server: POST /exampleapp/new_note_spa with JSON
  activate Server
  Server -->> Browser: Response (e.g. status 200 OK)
  deactivate Server

  Note right of Browser: JS receives response and updates DOM dynamically
  Browser -->> User: New note appears immediately on the page
  ```