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
    hasError: error,
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

  const loading = localLoading || storeLoading;

  const userInfo =
    !user || error ? (
      <>
        <Typography variant="h4" sx={{ mt: 6, ml: 1 }}>
          Invalid user
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The user with id {userId} does not exist. Try going back to the list.
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 2 }}>
          User Details
        </Typography>
        <Typography>
          <b>Name:</b> {user.name}
        </Typography>
        <Typography>
          <b>UserName:</b> {user.username}
        </Typography>
        <Typography>
          <b>Phone:</b> {user.phone}
        </Typography>
        <Typography>
          <b>Email:</b> {user.email}
        </Typography>
        <Typography>
          <b>City:</b> {user.address.city}
        </Typography>
        <Typography>
          <b>Company:</b> {user.company.name}
        </Typography>
      </>
    );

  const postList = (
    <>
      <Typography variant="h5" sx={{ mt: 4, ml: 2 }}>
        Posts
      </Typography>
      {postStoreLoading && (
        <CircularProgress size={150} thickness={3} sx={{ mt: 6 }} />
      )}
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
    </>
  );

  return (
    <div style={{ padding: "1rem" }}>
      <Button variant="contained" onClick={() => router.push(`/users`)}>
        Back to user&apos;s List
      </Button>

      {loading && <LinearProgress />}

      {!loading && userInfo}
      {!loading && !!user && postList}
    </div>
  );
};

export default observer(UserDetailPage);
