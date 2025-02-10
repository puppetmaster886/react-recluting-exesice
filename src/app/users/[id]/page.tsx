"use client";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function UserDetailPage() {
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
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
}
