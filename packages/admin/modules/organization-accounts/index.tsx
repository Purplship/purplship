"use client";

import { trpc } from "@karrio/trpc/client";
import { Card, CardContent } from "@karrio/insiders/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@karrio/insiders/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@karrio/insiders/components/ui/dropdown-menu";
import { Button } from "@karrio/insiders/components/ui/button";
import { useState } from "react";
import { GetAccounts_accounts_edges_node as Account } from "@karrio/types/graphql/admin/types";

type Column = {
  id: string;
  label: string;
  accessor: (account: Account) => string | number | JSX.Element;
};

const COLUMNS: Column[] = [
  {
    id: "name",
    label: "Name",
    accessor: (account) => account.name,
  },
  {
    id: "members",
    label: "Members",
    accessor: (account) => account.usage?.members || 0,
  },
  {
    id: "total_shipments",
    label: "Total Shipments",
    accessor: (account) => account.usage?.total_shipments || 0,
  },
  {
    id: "total_shipping_spend",
    label: "Total Spend",
    accessor: (account) =>
      `$${(account.usage?.total_shipping_spend || 0).toFixed(2)}`,
  },
  {
    id: "status",
    label: "Status",
    accessor: (account) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${account.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {account.is_active ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    id: "created",
    label: "Created",
    accessor: (account) =>
      new Date(account.created || Date.now()).toLocaleDateString(),
  },
];

const ITEMS_PER_PAGE = 25;

export default function OrganizationAccounts() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    COLUMNS.map((col) => col.id),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = trpc.admin.getAccounts.useQuery({});

  const accounts = data?.accounts?.edges || [];
  const totalAccounts = accounts.length;
  const totalPages = Math.ceil(totalAccounts / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Organization Accounts
      </h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center pb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Active Accounts
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <span className="mr-2">Columns</span>
                  <span className="w-4 h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {COLUMNS.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={visibleColumns.includes(column.id)}
                    onCheckedChange={() => toggleColumn(column.id)}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.filter((col) => visibleColumns.includes(col.id)).map(
                  (column) => (
                    <TableHead key={column.id}>{column.label}</TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map(({ node: account }) => {
                const accountWithDefaults: Account = {
                  ...account,
                  created: account.created || new Date().toISOString(),
                  modified: account.modified || new Date().toISOString(),
                };
                return (
                  <TableRow key={accountWithDefaults.id}>
                    {COLUMNS.filter((col) =>
                      visibleColumns.includes(col.id),
                    ).map((column) => (
                      <TableCell key={column.id}>
                        {column.accessor(accountWithDefaults)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, totalAccounts)} of{" "}
              {totalAccounts} accounts
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
