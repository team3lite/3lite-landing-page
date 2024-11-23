"use server";

import { User, UserModel, Users } from "../models/user";
export type Projection = {
  access_token: number;
  refresh_token: number;
  password: number;
};
const projection: Projection = {
  access_token: 0,
  refresh_token: 0,
  password: 0,
};
//q: how to use a new git repo in a project
//a: git init
//q: how to recreate a new one
//a: git init
//q: the uses the existing not a new one
//a: git clone
//q: how to create a new branch
//a: git
//q: how to unlink a git repo
//a: git remote remove origin
//q: what of the local git
//q: create a git remote from a local git
//a: git remote add origin <url>

