# Base users

[Base users](https://github.com/DLatouche/base-users) is a project comprising the basics of a web application with user management (authentication, administration dashboard, settings) using AdonisJS with Inertia and React. It's a base that can be reused to create other web applications.

---

![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat&logoColor=white&logo=typescript&color=2F73BF)
![Adonis](https://img.shields.io/badge/-Adonis-black?style=flat&logoColor=white&logo=adonisjs&color=5A45FF)
![Intertia](https://img.shields.io/badge/-Inertia-black?style=flat&logoColor=white&logo=inertia&color=756EEC)

![React](https://img.shields.io/badge/-React-black?style=flat&logoColor=white&logo=react&color=149ECA)
![Tailwindcss](https://img.shields.io/badge/-Tailwindcss-black?style=flat&logoColor=white&logo=Tailwindcss&color=38BDF8)
![Shadcnui](https://img.shields.io/badge/-shadcn/ui-black?style=flat&logoColor=white&logo=shadcnui&color=09090B)

![GitHub License](https://img.shields.io/github/license/DLatouche/base-users)

## Table Of Content

- [Installation](#installation)
- [Env variables](#env)
- [Start](#start)
- [Technologies](#technologies)
- [License](#license)

## <a name="installation">Installation</a>

To install this project, you will need to have on your machine :

![Node](https://img.shields.io/badge/-nodejs-black?style=flat&logoColor=white&logo=node.js&color=366A31)
![Postgres](https://img.shields.io/badge/-PostgreSQL-black?style=flat&logoColor=white&logo=postgresql&color=336791)

**Note:** Node.js >= 20.6 is required!

**Info:** For PostgreSQL , you can use the current docker-compose file

```bash
# Install dependencies
npm install
```

## <a name="env-variables">Env variables</a>

Environnement files need to be like **[env.ts](https://github.com/DLatouche/base-users/blob/main/start/env.ts)** on start/env.ts .

You need to create a `.env` file in this directory.

Environment variables are :

|             Name              |           Description           |                 exemple value                  |
| :---------------------------: | :-----------------------------: | :--------------------------------------------: |
|             `TZ`              |       Time zone for dates       |                     `UTC`                      |
|            `PORT`             |  Port on which app will be run  |                     `3333`                     |
|            `HOST`             |  Host on which app will be run  |                  `localhost`                   |
|          `LOG_LEVEL`          |            Log level            |                     `info`                     |
|           `APP_KEY`           |     App key used by adonis      |                       x                        |
|           `DB_HOST`           |          Database host          |                  `127.0.0.1`                   |
|           `DB_PORT`           |          Database port          |                     `5432`                     |
|           `DB_USER`           |          Database user          |                   `postgres`                   |
|         `DB_PASSWORD`         |        Database password        |               `random_password`                |
|         `DB_DATABASE`         |          Database name          |                  `base_users`                  |
|      `GOOGLE_CLIENT_ID`       |    Client id for google auth    |                       x                        |
|    `GOOGLE_CLIENT_SECRET`     |  Client secret for google auth  |                       x                        |
|     `GOOGLE_CALLBACK_URL`     |  Callback url for google auth   |    `http://localhost:3333/google/callback`     |
|     `DEFAULT_USER_ADMIN`      |    default email to be admin    |               `email@email.com`                |
|       `RESEND_API_KEY`        |   Resend API key for emailing   |                       x                        |
|         `RESEND_FROM`         |        Resend email from        |                       x                        |
|    `H_CAPTCHA_SECRET_KEY`     |       HCaptcha secret key       |                       x                        |
|     `H_CAPTCHA_SITE_KEY`      |        HCaptcha site key        |                       x                        |
|  `CALLBACK_VERIFY_EMAIL_URL`  |  Callback url for verify email  |  `http://localhost:3333/callback/verifyEmail`  |
| `CALLBACK_RESET_PASSWORD_URL` | Callback url for reset password | `http://localhost:3333/callback/resetPassword` |

## <a name="start">Start</a>

```bash
# Optionnal - Run dabatase with docker
docker-compose up -d

# Run the server
npm run dev

```

Then, go to <a target="blank" name="http://localhost:3333">localhost:3333</a>

## <a name="technologies">Technologies</a>

- <a name="[https://www.typescriptlang.org/docs/handbook/react.html](https://www.typescriptlang.org/docs/handbook/react.html)">Typescript</a> : to improve the quality and robustness of your JavaScript code with types.
- <a name="[https://docs.adonisjs.com/guides/preface/introduction](https://docs.adonisjs.com/guides/preface/introduction)">Adonis</a> : To create a fullstack Typescript application with a pleasant development experience
- <a name="[https://inertiajs.com/](https://inertiajs.com/)">Inertia</a> : To use React and simplify interaction with the server
- <a name="[https://react.dev/](https://react.dev/)">React</a> : Mastery of the framework, desire to use it with adonis
- <a name="[https://tailwindcss.com/](https://tailwindcss.com/)">Tailwind CSS </a> : Framework for rapid application styling
- <a name="[https://ui.shadcn.com/docs/installation/manual](https://ui.shadcn.com/docs/installation/manual)">Shadcn/ui</a> : Test the library with React and TailwindCSS. Make your components usable, easily customizable and accessible.

## <a name="license">License</a>

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).
