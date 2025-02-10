"use client";
import { useRootStore } from "@/providers/StoresProvider";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();

  const { userStore } = useRootStore();
  const { loadAllUsers, userList: users, isLoading: storeLoading } = userStore;

  const [localLoading, setLocalLoading] = useState(true);

  const loading = storeLoading || localLoading;
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

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    const userId = params.row.id;
    router.push(`/users/${userId}`);
  };

  useEffect(() => {
    loadAllUsers();
    setLocalLoading(false);
  }, [loadAllUsers]);

  return (
    <>
      <h1>User&apos;s list</h1>
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
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </>
  );
};

export default observer(Home);
