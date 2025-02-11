"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { Post, fetchPostsByUser } from "@/services/posts";
import { RootStore } from "./index";

export class PostStore {
  private postsByUser: Map<number, Post[]> = new Map();
  private loading: boolean = false;
  private error: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get postsForSelectedUser(): Post[] {
    const userId = this.rootStore.userStore.selectedUserIdValue;
    if (userId === null) return [];
    return this.postsByUser.get(userId) || [];
  }

  get isLoading() {
    return this.loading;
  }

  get hasError() {
    return this.error !== null;
  }

  get errorValue() {
    return this.error;
  }

  loadPostsByUser = async (userId: number): Promise<Post[] | undefined> => {
    const existingPosts = this.postsByUser.get(userId);
    if (existingPosts) return existingPosts;

    this.loading = true;
    this.error = null;
    try {
      const posts = await fetchPostsByUser(userId);
      runInAction(() => {
        this.postsByUser.set(userId, posts);
      });
      return posts;
    } catch (err: unknown) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Unknown error";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadPostsForSelectedUser = async (): Promise<Post[] | undefined> => {
    const userId = this.rootStore.userStore.selectedUserIdValue;
    if (userId === null) throw new Error("No hay usuario seleccionado");
    return await this.loadPostsByUser(userId);
  };
}
