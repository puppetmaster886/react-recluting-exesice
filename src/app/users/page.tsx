"use client";
import { useRootStore } from "@/providers/StoresProvider";
import { LinearProgress, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import Highlighter from "react-highlight-words";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { userStore } = useRootStore();
  const {
    loadAllUsers,
    userList: users,
    isLoading: storeLoading,
    hasError: error,
  } = userStore;

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

  const columnVisibilityModel = {
    phone: !isMobile,
    email: !isMobileSmall,
    city: !isMobile,
    company: !isMobileSmall,
  };

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
      <Typography variant="h3" ml={4}>
        User&apos;s list
      </Typography>
      <div style={{ height: 630 }}>
        {loading && <LinearProgress />}
        {!loading && users.length === 0 && (
          <Typography variant="h4" sx={{ mt: 6, ml: 1 }}>
            No users found
          </Typography>
        )}
        {!loading && error && (
          <Typography variant="h4" sx={{ mt: 6, ml: 1 }}>
            Error loading users...
          </Typography>
        )}
        {!loading && users.length > 0 && (
          <>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search user, username, email or company..."
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                width: isMobileSmall ? "99%" : "95%",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
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
              columnVisibilityModel={columnVisibilityModel}
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
