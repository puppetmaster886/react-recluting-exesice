"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { User, fetchUsers, fetchUser } from "@/services/users";

export class UserStore {
  private users: User[] = [];
  private loading: boolean = false;
  private error: string | null = null;
  private selectedUserId: number | null = null;
  private allUsersLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get userList() {
    return this.users;
  }

  get isLoading() {
    return this.loading;
  }

  get hasError() {
    return this.error !== null;
  }

  get selectedUser() {
    if (this.selectedUserId === null) return undefined;
    return this.getUserById(this.selectedUserId);
  }

  get selectedUserIdValue(): number | null {
    return this.selectedUserId;
  }

  get errorValue() {
    return this.error;
  }

  getUserById = (id: number): User | undefined => {
    return this.users.find((u) => u.id === id);
  };

  loadAllUsers = async (): Promise<User[] | undefined> => {
    if (this.allUsersLoaded) return;
    this.loading = true;
    this.error = null;
    try {
      const data = await fetchUsers();
      runInAction(() => {
        this.users = data;
        this.allUsersLoaded = true;
      });
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

  loadUserIfNotPresent = async (id: number): Promise<User | undefined> => {
    this.selectedUserId = id;
    const existing = this.getUserById(id);
    if (existing) {
      return existing;
    }
    this.loading = true;
    this.error = null;
    try {
      const user = await fetchUser(id);
      runInAction(() => {
        this.users.push(user);
      });
      return user;
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
}
