"use client";

import React from "react";
import Link from "next/link";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

const UserTable = React.memo(function UserTable({ users }: { users: any[] }) {
  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} hover>
              <TableCell>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src={u.image} alt={u.firstName} />
                  <Typography
                    component={Link}
                    href={`/users/${u.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {u.firstName} {u.lastName}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.gender}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>{u.company?.name || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});

export default UserTable;