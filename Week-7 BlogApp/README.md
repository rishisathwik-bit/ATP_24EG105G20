# Blog App

This repository contains a full-stack blog application with separate backend and frontend projects.

## Overview

The Blog App supports three types of users and an article workflow:

- `USER`
  - Can register and log in.
  - Can browse published articles.
  - Can view their profile and manage their account.
- `AUTHOR`
  - Can register and log in.
  - Can create new articles and update their own articles.
  - Can view article lists for authors and manage content.
- `ADMIN`
  - Can log in and access the admin dashboard.
  - Can manage users, authors, and articles.
  - Can deactivate accounts or perform administrative actions.

## Article Purpose

Articles are the main content items in this application:

- Authors create and publish articles.
- Users read articles and navigate article details.
- Admins can review all articles across the platform.

Each article belongs to an author and is visible to the appropriate audience based on the frontend routes and backend access control.
