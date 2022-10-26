# Project: Member's Only

## Description

- The purpose of this assignment is to test understanding of authentication in express, and solidify database usage.

- Assignment link: <https://www.theodinproject.com/lessons/nodejs-members-only>

## Notes

- I focus on making the backend as typesafe as possible, and this resulted in using prisma(ORM), and zod(request validation).

- The validate middleware was a very interesting application of functional programming, and I plan on expanding upon that in my future projects.

- Using zod, I was also able to make the enviroment variables typesafe.

- I did find the deployment to render a little more perplexing that expected. I was eventually able to find the solution in this [thread](https://community.render.com/t/typescript-support/377/25).

## Learned

- Using prisma with an sql database
- zod for request validation
- a strong grasp on user authentication and role restriction

## Site

- Check backend health: <https://members-only-85me.onrender.com/api/checkhealth>
