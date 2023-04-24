---
title: Vite + React
description: The default Vite + React starter, utilizing `serve` to serve the built app
tags:
  - node
  - vite
  - react
---

# Vite + React + Serve

This is a [Vite + React](https://vitejs.dev/guide/#trying-vite-online) starter that uses [serve](https://www.npmjs.com/package/serve).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/NeiLty?referralCode=ySCnWl)

## ✨ Features

- Vite + React
- Serve

## 💁‍♀️ How to use

- Install required dependencies with `npm install`
- Start the server for local development `npm run dev`

## ❓ Why use `serve`

By default Railway will use the `start` script defined in package.json to run your app, the default Vite + React starter project does not come with any `start` script, so I have added `serve` as the start script, there are many benefits to using serve over just running the vite command. 

 - `serve` is more suited to run single page apps
 - Uses less ram than `vite` or `vite preview` (<100mb)
 - Far more performant and stable