"use client";

import { trpc } from "@karrio/trpc/client";
import {
  Card,
  CardContent,
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
import { GetSystemConnections_system_carrier_connections as Connection } from "@karrio/types/graphql/admin/types";
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
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { Badge } from "@karrio/insiders/components/ui/badge";
import { Switch } from "@karrio/insiders/components/ui/switch";
import { isNoneOrEmpty } from "@karrio/lib";

type Column = {
  id: string;
  label: string;
  accessor: (connection: Connection) => string | number | JSX.Element;
  defaultVisible?: boolean;
};

const COLUMNS: Column[] = [
  {
    id: "carrier",
    label: "Carrier",
    accessor: (connection) => (
      <div className="flex items-center space-x-4">
        <CarrierImage
          carrier_name={connection.carrier_name}
          width={40}
          height={40}
        />
        <div>
          <div className="font-medium">
            {connection.display_name || connection.carrier_name}
          </div>
          <div className="text-sm text-gray-500">{connection.carrier_name}</div>
        </div>
      </div>
    ),
    defaultVisible: true,
  },
  {
    id: "mode",
    label: "Mode",
    accessor: (connection) => (
      <Badge variant={connection.test_mode ? "outline" : "default"}>
        {connection.test_mode ? "Test" : "Live"}
      </Badge>
    ),
    defaultVisible: true,
  },
  {
    id: "capabilities",
    label: "Capabilities",
    accessor: (connection) => (
      <div className="flex flex-wrap gap-2">
        {!isNoneOrEmpty(connection.capabilities) &&
          connection.capabilities?.map((capability) => (
            <Badge key={capability} variant="secondary">
              {capability}
            </Badge>
          ))}
      </div>
    ),
    defaultVisible: true,
  },
  {
    id: "status",
    label: "Status",
    accessor: (connection) => (
      <Switch checked={connection.active} onCheckedChange={() => {}} />
    ),
    defaultVisible: true,
  },
];

const ITEMS_PER_PAGE = 25;

export default function CarrierConnectionsPage() {
  const { toast } = useToast();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    COLUMNS.filter((col) => col.defaultVisible !== false).map((col) => col.id),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<Connection | null>(null);
  const utils = trpc.useContext();

  // Fetch connections
  const { data, isLoading } = trpc.admin.system_connections.list.useQuery();

  // Mutations
  const createConnection = trpc.admin.system_connections.create.useMutation({
    onSuccess: () => {
      toast({ title: "Carrier connection created successfully" });
      setIsCreateOpen(false);
      utils.admin.system_connections.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to create carrier connection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateConnection = trpc.admin.system_connections.update.useMutation({
    onSuccess: () => {
      toast({ title: "Carrier connection updated successfully" });
      setIsEditOpen(false);
      setSelectedConnection(null);
      utils.admin.system_connections.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to update carrier connection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteConnection = trpc.admin.system_connections.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Carrier connection deleted successfully" });
      setIsDeleteOpen(false);
      setSelectedConnection(null);
      utils.admin.system_connections.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to delete carrier connection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const connections = data || [];
  const totalConnections = connections.length;
  const totalPages = Math.ceil(totalConnections / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentConnections = connections.slice(startIndex, endIndex);

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
    createConnection.mutate({
      data: {
        carrier_name: formData.get("carrier_name") as string,
        display_name: formData.get("display_name") as string,
        test_mode: formData.get("test_mode") === "on",
        active: true,
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedConnection) return;
    const formData = new FormData(e.currentTarget);
    updateConnection.mutate({
      data: {
        id: selectedConnection.id,
        carrier_name: formData.get("carrier_name") as string,
        display_name: formData.get("display_name") as string,
        test_mode: formData.get("test_mode") === "on",
        active: formData.get("active") === "on",
      },
    });
  };

  const handleDelete = async () => {
    if (!selectedConnection) return;
    deleteConnection.mutate({
      data: {
        id: selectedConnection.id,
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
          Carrier Management
        </h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Connection</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Carrier Connection</DialogTitle>
              <DialogDescription>
                Create a new carrier connection.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carrier_name">Carrier Name</Label>
                <Input id="carrier_name" name="carrier_name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input id="display_name" name="display_name" required />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="test_mode"
                  name="test_mode"
                  className="h-4 w-4"
                />
                <Label htmlFor="test_mode">Test Mode</Label>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createConnection.status === "pending"}
                >
                  {createConnection.status === "pending"
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
              Carrier Connections
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
              {currentConnections.map((connection) => (
                <TableRow key={connection.id}>
                  {COLUMNS.filter((col) => visibleColumns.includes(col.id)).map(
                    (column) => (
                      <TableCell key={column.id}>
                        {column.accessor(connection)}
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
                            setSelectedConnection(connection);
                            setIsEditOpen(true);
                          }}
                        >
                          Edit connection
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedConnection(connection);
                            setIsDeleteOpen(true);
                          }}
                          className="text-red-600"
                        >
                          Delete connection
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
              Showing {startIndex + 1} to {Math.min(endIndex, totalConnections)}{" "}
              of {totalConnections} connections
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
              setSelectedConnection(null);
            });
          }
        }}
      >
        <DialogContent>
          {selectedConnection && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Carrier Connection</DialogTitle>
                <DialogDescription>
                  Update carrier connection details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_carrier_name">Carrier Name</Label>
                  <Input
                    id="edit_carrier_name"
                    name="carrier_name"
                    defaultValue={selectedConnection?.carrier_name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_display_name">Display Name</Label>
                  <Input
                    id="edit_display_name"
                    name="display_name"
                    defaultValue={selectedConnection?.display_name}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="edit_test_mode"
                    name="test_mode"
                    className="h-4 w-4"
                    defaultChecked={selectedConnection?.test_mode}
                  />
                  <Label htmlFor="edit_test_mode">Test Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="edit_active"
                    name="active"
                    className="h-4 w-4"
                    defaultChecked={selectedConnection?.active}
                  />
                  <Label htmlFor="edit_active">Active</Label>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={updateConnection.status === "pending"}
                  >
                    {updateConnection.status === "pending"
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
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open);
          if (!open) {
            requestAnimationFrame(() => {
              setSelectedConnection(null);
            });
          }
        }}
      >
        <DialogContent>
          {selectedConnection && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Carrier Connection</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  {selectedConnection.display_name ||
                    selectedConnection.carrier_name}
                  ? This action cannot be undone.
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
                  disabled={deleteConnection.status === "pending"}
                >
                  {deleteConnection.status === "pending"
                    ? "Deleting..."
                    : "Delete Connection"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
