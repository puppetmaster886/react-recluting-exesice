"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useRootStore } from "@/providers/StoresProvider";
import { useParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id ? Number(params.id) : null;

  const { userStore, postStore } = useRootStore();
  const {
    loadUserIfNotPresent,
    selectedUser: user,
    isLoading: storeLoading,
  } = userStore;
  const {
    postsForSelectedUser: posts,
    loadPostsForSelectedUser,
    isLoading: postStoreLoading,
  } = postStore;

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (userId !== null && !isNaN(userId)) {
      loadUserIfNotPresent(userId);
      loadPostsForSelectedUser();
      setLocalLoading(false);
    }
  }, [userId, loadUserIfNotPresent, loadPostsForSelectedUser]);

  if (localLoading || storeLoading) return <LinearProgress />;
  if (!user) return <Typography>Invalid user</Typography>;

  return (
    <div style={{ padding: "1rem" }}>
      <Button variant="contained" onClick={() => router.push(`/users`)}>
        User&apos;s List
      </Button>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        User Detail
      </Typography>
      <Typography>Name: {user.name}</Typography>
      <Typography>UserName: {user.username}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>City: {user.address.city}</Typography>
      <Typography>Company: {user.company.name}</Typography>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Posts
      </Typography>
      {postStoreLoading && <CircularProgress />}
      {!postStoreLoading &&
        !!posts.length &&
        posts.map((post) => (
          <Card key={post.id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.body}</Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default observer(UserDetailPage);
