"use client";

import { trpc } from "@karrio/trpc/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@karrio/insiders/components/ui/card";
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
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@karrio/insiders/components/ui/dropdown-menu";
import { Button } from "@karrio/insiders/components/ui/button";
import { Input } from "@karrio/insiders/components/ui/input";
import { Label } from "@karrio/insiders/components/ui/label";
import { useToast } from "@karrio/insiders/hooks/use-toast";
import { useState } from "react";
import { GetAccounts_accounts_edges_node as Account } from "@karrio/types/graphql/admin/types";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@karrio/insiders/components/ui/dialog";

type Column = {
  id: string;
  label: string;
  accessor: (account: Account) => string | number | JSX.Element;
  defaultVisible?: boolean;
};

const COLUMNS: Column[] = [
  {
    id: "name",
    label: "Name",
    accessor: (account) => account.name,
    defaultVisible: true,
  },
  {
    id: "members",
    label: "Members",
    accessor: (account) => account.usage?.members || 0,
    defaultVisible: true,
  },
  {
    id: "total_requests",
    label: "Requests",
    accessor: (account) => account.usage?.total_requests || 0,
    defaultVisible: false,
  },
  {
    id: "total_shipments",
    label: "Shipments",
    accessor: (account) => account.usage?.total_shipments || 0,
    defaultVisible: true,
  },
  {
    id: "total_trackers",
    label: "Trackers",
    accessor: (account) => account.usage?.total_trackers || 0,
    defaultVisible: false,
  },
  {
    id: "total_shipping_spend",
    label: "Estimated Spend",
    accessor: (account) => account.usage?.total_shipping_spend || 0,
    defaultVisible: true,
  },
  {
    id: "unfulfilled_orders",
    label: "Unfulfilled Orders",
    accessor: (account) => account.usage?.unfulfilled_orders || 0,
    defaultVisible: false,
  },
  {
    id: "order_volume",
    label: "Order Volume",
    accessor: (account) => account.usage?.order_volume || 0,
    defaultVisible: false,
  },
  {
    id: "total_errors",
    label: "Errors",
    accessor: (account) => account.usage?.total_errors || 0,
    defaultVisible: false,
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
    defaultVisible: true,
  },
  {
    id: "created",
    label: "Created",
    accessor: (account) =>
      new Date(account.created || Date.now()).toLocaleDateString(),
    defaultVisible: true,
  },
];

const ITEMS_PER_PAGE = 25;

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export default function OrganizationAccounts() {
  const { toast } = useToast();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    COLUMNS.filter((col) => col.defaultVisible !== false).map((col) => col.id),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const utils = trpc.useContext();

  // Fetch accounts
  const { data, isLoading } = trpc.admin.organization_accounts.list.useQuery(
    {},
  );

  // Mutations
  const createOrganization =
    trpc.admin.organization_accounts.create.useMutation({
      onSuccess: () => {
        toast({ title: "Organization created successfully" });
        setIsCreateOpen(false);
        utils.admin.organization_accounts.list.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Failed to create organization",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const updateOrganization =
    trpc.admin.organization_accounts.update.useMutation({
      onSuccess: () => {
        toast({ title: "Organization updated successfully" });
        setIsEditOpen(false);
        setSelectedAccount(null);
        utils.admin.organization_accounts.list.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Failed to update organization",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const disableOrganization =
    trpc.admin.organization_accounts.disable.useMutation({
      onSuccess: () => {
        toast({ title: "Organization disabled successfully" });
        setIsDisableOpen(false);
        setSelectedAccount(null);
        utils.admin.organization_accounts.list.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Failed to disable organization",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const deleteOrganization =
    trpc.admin.organization_accounts.delete.useMutation({
      onSuccess: () => {
        toast({ title: "Organization deleted successfully" });
        setIsDeleteOpen(false);
        setSelectedAccount(null);
        utils.admin.organization_accounts.list.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Failed to delete organization",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const accounts = data?.edges || [];
  const totalAccounts = accounts.length;
  const totalPages = Math.ceil(totalAccounts / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const processedAccounts = accounts.map(({ node }) => {
    const account: Account = {
      ...node,
      created: node.created || new Date().toISOString(),
      modified: node.modified || new Date().toISOString(),
      usage: {
        members: node.usage?.members || 0,
        total_errors: node.usage?.total_errors || 0,
        order_volume: node.usage?.order_volume || 0,
        total_requests: node.usage?.total_requests || 0,
        total_trackers: node.usage?.total_trackers || 0,
        total_shipments: node.usage?.total_shipments || 0,
        unfulfilled_orders: node.usage?.unfulfilled_orders || 0,
        total_shipping_spend: node.usage?.total_shipping_spend || 0,
      },
    };
    return account;
  });

  const currentAccounts = processedAccounts.slice(startIndex, endIndex);

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    createOrganization.mutate({
      data: {
        name: name,
        slug: generateSlug(name),
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAccount) return;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    updateOrganization.mutate({
      data: {
        id: selectedAccount.id,
        name: name,
        slug: generateSlug(name),
      },
    });
  };

  const handleDisable = async () => {
    if (!selectedAccount) return;
    disableOrganization.mutate({
      data: {
        id: selectedAccount.id,
      },
    });
  };

  const handleDelete = async () => {
    if (!selectedAccount) return;
    deleteOrganization.mutate({
      data: {
        id: selectedAccount.id,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">
          Organization Accounts
        </h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Create a new organization account.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createOrganization.status === "pending"}
                >
                  {createOrganization.status === "pending"
                    ? "Creating..."
                    : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between pb-6">
            <CardTitle className="text-2xl font-semibold">
              Active Organizations
            </CardTitle>
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
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map((account) => (
                <TableRow key={account.id}>
                  {COLUMNS.filter((col) => visibleColumns.includes(col.id)).map(
                    (column) => (
                      <TableCell key={column.id}>
                        {column.accessor(account)}
                      </TableCell>
                    ),
                  )}
                  <TableCell className="w-8 p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedAccount(account);
                            setIsEditOpen(true);
                          }}
                        >
                          Edit organization
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedAccount(account);
                            setIsDisableOpen(true);
                          }}
                          className="text-yellow-600"
                        >
                          Disable organization
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedAccount(account);
                            setIsDeleteOpen(true);
                          }}
                          className="text-red-600"
                        >
                          Delete organization
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between space-x-2 pt-6">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, totalAccounts)} of{" "}
              {totalAccounts} organizations
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

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) {
            requestAnimationFrame(() => {
              setSelectedAccount(null);
            });
          }
        }}
      >
        <DialogContent>
          {selectedAccount && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Organization</DialogTitle>
                <DialogDescription>
                  Update organization details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_name">Name</Label>
                  <Input
                    id="edit_name"
                    name="name"
                    defaultValue={selectedAccount?.name}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={updateOrganization.status === "pending"}
                  >
                    {updateOrganization.status === "pending"
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDisableOpen}
        onOpenChange={(open) => {
          setIsDisableOpen(open);
          if (!open) {
            requestAnimationFrame(() => {
              setSelectedAccount(null);
            });
          }
        }}
      >
        <DialogContent>
          {selectedAccount && (
            <>
              <DialogHeader>
                <DialogTitle>Disable Organization</DialogTitle>
                <DialogDescription>
                  Are you sure you want to disable {selectedAccount.name}? This
                  action can be reversed later.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDisableOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDisable}
                  disabled={disableOrganization.status === "pending"}
                >
                  {disableOrganization.status === "pending"
                    ? "Disabling..."
                    : "Disable Organization"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open);
          if (!open) {
            requestAnimationFrame(() => {
              setSelectedAccount(null);
            });
          }
        }}
      >
        <DialogContent>
          {selectedAccount && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Organization</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {selectedAccount.name}? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteOrganization.status === "pending"}
                >
                  {deleteOrganization.status === "pending"
                    ? "Deleting..."
                    : "Delete Organization"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
