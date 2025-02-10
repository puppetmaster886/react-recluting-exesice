"use client";

import { PostStore } from "./PostStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore;
  postStore: PostStore;

  constructor() {
    this.userStore = new UserStore();
    this.postStore = new PostStore(this);
  }
}

export const rootStore = new RootStore();
