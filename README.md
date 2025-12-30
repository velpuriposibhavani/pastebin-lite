# Pastebin-Lite

A lightweight, high-performance Pastebin clone built with **Next.js 14** and **Upstash Redis**. This application allows users to create temporary text pastes with expiration times and view limits.

##  Live Demo
[https://pastebin-lite-ew6l.vercel.app](https://pastebin-lite-ew6l.vercel.app)

## Features
* **Create Pastes**: Quickly share code snippets or text.
* **Time-to-Live (TTL)**: Set an expiration time (in seconds) for your pastes.
* **Max View Limit**: Automatically delete pastes after a certain number of views.
* **Serverless Edge Functions**: Extremely fast response times using Next.js Route Handlers.
* **Cloud Persistence**: Uses Upstash Redis for global data storage.

##  Tech Stack
* **Framework**: Next.js 14 (App Router)
* **Database**: Upstash Redis
* **Styling**: Tailwind CSS
* **Deployment**: Vercel

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file or Vercel settings:

`UPSTASH_REDIS_REST_URL`
`UPSTASH_REDIS_REST_TOKEN`
## Deployment
This project is automatically deployed via Vercel whenever changes are pushed to the `main` branch.
