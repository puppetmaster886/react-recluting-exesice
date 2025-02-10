"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useRootStore } from "@/providers/StoresProvider";
import { useParams } from "next/navigation";
import { observer } from "mobx-react-lite";

const UserDetailPage = () => {
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
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Detalle del Usuario
      </Typography>
      <Typography>Nombre: {user.name}</Typography>
      <Typography>Usuario: {user.username}</Typography>
      <Typography>Teléfono: {user.phone}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Ciudad: {user.address.city}</Typography>
      <Typography>Empresa: {user.company.name}</Typography>

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
