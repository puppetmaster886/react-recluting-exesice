"use client";
import { fetchUsers, User } from "@/services/users";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      sortable: true,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      sortable: true,
    },
  ];

  async function getUsers() {
    try {
      setLoading(true);
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users list</h1>
      <div style={{ height: 630, width: "80%" }}>
        {loading && <LinearProgress />}
        {!loading && users.length === 0 && <div>No users found</div>}
        {!loading && users.length > 0 && (
          <DataGrid
            rows={users.map((user) => ({
              id: user.id,
              name: user.name,
              username: user.username,
              phone: user.phone,
              email: user.email,
              city: user.address.city,
              company: user.company.name,
            }))}
            columns={columns}
            autoPageSize
            sx={{ border: 0 }}
            disableRowSelectionOnClick
          />
        )}
      </div>
    </>
  );
}
