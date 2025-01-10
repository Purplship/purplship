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
  DropdownMenuTrigger,
} from "@karrio/insiders/components/ui/dropdown-menu";
import { Button } from "@karrio/insiders/components/ui/button";
import { Switch } from "@karrio/insiders/components/ui/switch";
import { Badge } from "@karrio/insiders/components/ui/badge";
import { useToast } from "@karrio/insiders/hooks/use-toast";
import { MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmationDialog } from "@karrio/insiders/components/delete-confirmation-dialog";
import { SurchargeDialog } from "@karrio/insiders/components/surcharge-dialog";
import {
  GetSurcharges_surcharges as Surcharge,
  SurchargeTypeEnum,
} from "@karrio/types/graphql/admin/types";

interface FormValues {
  id?: string;
  name: string;
  amount: number;
  surcharge_type: SurchargeTypeEnum;
  active: boolean;
  carriers?: string[];
  services?: string[];
  carrier_accounts?: string[];
}

export default function Page() {
  const utils = trpc.useContext();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSurcharge, setSelectedSurcharge] = useState<Surcharge | null>(
    null,
  );

  const { data: surcharges, isLoading } = trpc.admin.surcharges.list.useQuery();

  const createSurcharge = trpc.admin.surcharges.create.useMutation({
    onSuccess: () => {
      toast({ title: "Surcharge created successfully" });
      setIsCreateOpen(false);
      utils.admin.surcharges.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to create surcharge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateSurcharge = trpc.admin.surcharges.update.useMutation({
    onSuccess: () => {
      toast({ title: "Surcharge updated successfully" });
      setIsEditOpen(false);
      setSelectedSurcharge(null);
      utils.admin.surcharges.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to update surcharge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSurcharge = trpc.admin.surcharges.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Surcharge deleted successfully" });
      setIsDeleteOpen(false);
      setSelectedSurcharge(null);
      utils.admin.surcharges.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to delete surcharge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreate = async (values: FormValues) => {
    const { carrier_accounts: _, id: __, ...input } = values;
    await createSurcharge.mutateAsync({
      data: {
        name: input.name,
        amount: input.amount,
        surcharge_type: input.surcharge_type,
        active: input.active,
        carriers: input.carriers,
        services: input.services,
      },
    });
  };

  const handleUpdate = async (values: FormValues) => {
    if (!values.id) return;
    const { carrier_accounts: _, ...input } = values;
    await updateSurcharge.mutateAsync({
      data: {
        id: values.id,
        name: input.name,
        amount: input.amount,
        surcharge_type: input.surcharge_type,
        active: input.active,
        carriers: input.carriers,
        services: input.services,
      },
    });
  };

  const handleDelete = async () => {
    if (!selectedSurcharge) return;
    await deleteSurcharge.mutateAsync({
      data: { id: selectedSurcharge.id },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-[28px] font-medium tracking-tight">Surcharges</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Surcharge
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Surcharges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surcharges?.map((surcharge) => (
                <TableRow key={surcharge.id}>
                  <TableCell>{surcharge.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{surcharge.surcharge_type}</Badge>
                  </TableCell>
                  <TableCell>
                    {surcharge.surcharge_type === SurchargeTypeEnum.PERCENTAGE
                      ? `${surcharge.amount}%`
                      : `$${surcharge.amount}`}
                  </TableCell>
                  <TableCell>
                    <Switch checked={surcharge.active} disabled />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSurcharge(surcharge);
                            setIsEditOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedSurcharge(surcharge);
                            setIsDeleteOpen(true);
                          }}
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
        </CardContent>
      </Card>

      <SurchargeDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />

      <SurchargeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleUpdate}
        defaultValues={selectedSurcharge || undefined}
      />

      <DeleteConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Surcharge"
        description="Are you sure you want to delete this surcharge? This action cannot be undone."
      />
    </>
  );
}
