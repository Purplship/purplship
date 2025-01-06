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
  DropdownMenuTrigger,
} from "@karrio/insiders/components/ui/dropdown-menu";
import { GetSystemConnections_system_carrier_connections as BaseConnection } from "@karrio/types/graphql/admin/types";
import { DeleteConfirmationDialog } from "@karrio/insiders/components/delete-confirmation-dialog";
import { CarrierConnectionDialog } from "@karrio/insiders/components/carrier-connection-dialog";
import { CarrierImage } from "@karrio/ui/components/carrier-image";
import { Button } from "@karrio/insiders/components/ui/button";
import { Switch } from "@karrio/insiders/components/ui/switch";
import { Badge } from "@karrio/insiders/components/ui/badge";
import { useToast } from "@karrio/insiders/hooks/use-toast";
import { MoreVertical, Copy } from "lucide-react";
import { isNoneOrEmpty } from "@karrio/lib";
import { useState } from "react";

type Connection = BaseConnection & {
  credentials?: Record<string, any>;
  config?: Record<string, any>;
};

export default function CarrierConnections() {
  const utils = trpc.useContext();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<Connection | null>(null);

  const { data: connections, isLoading } =
    trpc.admin.system_connections.list.useQuery();

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

  const handleUpdate = (values: any) => {
    updateConnection.mutate({
      data: {
        id: values.id,
        carrier_name: values.carrier_name,
        display_name: values.display_name,
        test_mode: values.test_mode,
        active: values.active,
        capabilities: values.capabilities,
        credentials: values.credentials || {},
        config: values.config || {},
      },
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Carrier Management
        </h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex justify-between items-center border-b p-6">
            <CardTitle className="text-lg font-medium">
              Carrier Connections
            </CardTitle>
            <Button onClick={() => setIsEditOpen(true)}>Add Connection</Button>
          </div>

          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Capabilities</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connections?.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <CarrierImage
                          carrier_name={connection.carrier_name}
                          width={32}
                          height={32}
                        />
                        <div className="space-y-1">
                          <div className="font-medium">
                            {connection.display_name || connection.carrier_name}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <span>{connection.id}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-3 w-3 p-0 hover:bg-transparent"
                              onClick={() => {
                                navigator.clipboard.writeText(connection.id);
                                toast({
                                  title: "Copied to clipboard",
                                  description:
                                    "Carrier ID has been copied to your clipboard",
                                });
                              }}
                            >
                              <Copy className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {!isNoneOrEmpty(connection.capabilities) &&
                          connection.capabilities?.map((capability) => (
                            <Badge
                              key={capability}
                              variant="secondary"
                              className="whitespace-nowrap"
                            >
                              {capability}
                            </Badge>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={connection.active}
                        onCheckedChange={(checked) => {
                          updateConnection.mutate({
                            data: {
                              id: connection.id,
                              active: checked,
                              carrier_name: connection.carrier_name,
                              display_name: connection.display_name || "",
                              test_mode: connection.test_mode,
                              capabilities: connection.capabilities || [],
                              credentials: {},
                              config: {},
                            },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedConnection(connection as Connection);
                              setIsEditOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedConnection(connection as Connection);
                              setIsDeleteOpen(true);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CarrierConnectionDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedConnection={selectedConnection}
        onSubmit={handleUpdate}
      />

      <DeleteConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Connection"
        description="Are you sure you want to delete this carrier connection? This action cannot be undone."
        onConfirm={() => {
          if (selectedConnection) {
            deleteConnection.mutate({
              data: { id: selectedConnection.id },
            });
          }
        }}
      />
    </div>
  );
}
