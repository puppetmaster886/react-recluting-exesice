"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { useRootStore } from "@/providers/StoresProvider";
import { useParams } from "next/navigation";
import { observer } from "mobx-react-lite";

const UserDetailPage = () => {
  const params = useParams();
  const userId = params.id ? Number(params.id) : null;

  const { userStore } = useRootStore();
  const {
    loadUserIfNotPresent,
    selectedUser: user,
    isLoading: storeLoading,
  } = userStore;

  const [localLoading, setLocalLoading] = useState(true);

  const posts = [
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "test",
      body: "tsetset set tst setset ",
    },
  ];

  useEffect(() => {
    if (userId !== null && !isNaN(userId)) {
      loadUserIfNotPresent(userId);
      setLocalLoading(false);
    }
  }, [userId, loadUserIfNotPresent]);

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
      {posts.map((post) => (
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
