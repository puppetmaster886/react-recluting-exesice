"use client";
import { useRootStore } from "@/providers/StoresProvider";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import Highlighter from "react-highlight-words";

const Home = () => {
  const router = useRouter();

  const { userStore } = useRootStore();
  const { loadAllUsers, userList: users, isLoading: storeLoading } = userStore;

  const [localLoading, setLocalLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const loading = storeLoading || localLoading;

  const filteredUsers = useMemo(() => {
    if (!searchText) return users;
    const fuse = new Fuse(users, {
      keys: ["name", "username", "email", "company"],
      threshold: 0.3,
      ignoreDiacritics: true,
    });
    return fuse.search(searchText).map((result) => result.item);
  }, [users, searchText]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={params.value || ""}
        />
      ),
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={params.value || ""}
        />
      ),
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
      renderCell: (params) => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={params.value || ""}
        />
      ),
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
      renderCell: (params) => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={params.value || ""}
        />
      ),
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
          <>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search user"
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "50%" }}
            />
            <DataGrid
              rows={filteredUsers.map((user) => ({
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
          </>
        )}
      </div>
    </>
  );
};

export default observer(Home);
