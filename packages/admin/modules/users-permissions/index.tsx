"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@karrio/insiders/components/ui/dialog";
import { Button } from "@karrio/insiders/components/ui/button";
import { Input } from "@karrio/insiders/components/ui/input";
import { Label } from "@karrio/insiders/components/ui/label";
import { Checkbox } from "@karrio/insiders/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@karrio/insiders/components/ui/select";
import { useToast } from "@karrio/insiders/hooks/use-toast";
import { useState } from "react";
import { trpc } from "@karrio/trpc/client";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@karrio/insiders/components/ui/dropdown-menu";

export default function Page() {
  const { toast } = useToast();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const utils = trpc.useContext();

  // Fetch users and permission groups
  const { data: usersData, isLoading: isLoadingUsers } =
    trpc.admin.users.list.useQuery({});
  const { data: permissionGroupsData, isLoading: isLoadingPermissions } =
    trpc.admin.permission_groups.list.useQuery();
  const users = usersData?.edges || [];
  const permissionGroups = permissionGroupsData?.edges || [];

  // Mutations
  const createUser = trpc.admin.users.create.useMutation({
    onSuccess: () => {
      toast({ title: "User created successfully" });
      setIsInviteOpen(false);
      utils.admin.users.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to create user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateUser = trpc.admin.users.update.useMutation({
    onSuccess: () => {
      toast({ title: "User updated successfully" });
      setIsEditOpen(false);
      utils.admin.users.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to update user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeUser = trpc.admin.users.remove.useMutation({
    onSuccess: () => {
      toast({ title: "User removed successfully" });
      utils.admin.users.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to remove user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const inviteUser = trpc.admin.users.create.useMutation({
    onSuccess: () => {
      toast({ title: "User invited successfully" });
      setIsInviteOpen(false);
      utils.admin.users.list.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Failed to invite user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const role = formData.get("role") as "member" | "developer" | "admin";

    inviteUser.mutate({
      data: {
        email: formData.get("email") as string,
        full_name: formData.get("full_name") as string,
        is_staff: role === "admin",
        is_active: true,
        permissions: [],
      },
    });
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const permissions = Array.from(formData.getAll("permissions")) as string[];

    createUser.mutate({
      data: {
        email: formData.get("email") as string,
        full_name: formData.get("full_name") as string,
        is_staff: formData.get("is_staff") === "on",
        is_active: true,
        permissions,
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const permissions = Array.from(formData.getAll("permissions")) as string[];

    updateUser.mutate({
      data: {
        id: selectedUser.id,
        full_name: formData.get("full_name") as string,
        is_staff: formData.get("is_staff") === "on",
        is_active: formData.get("is_active") === "on",
        permissions,
      },
    });
  };

  const handleRemove = async (user: any) => {
    if (confirm("Are you sure you want to remove this user?")) {
      removeUser.mutate({
        data: {
          id: user.id,
        },
      });
    }
  };

  // Fix mutation status checks
  const isInviting = inviteUser.status === "pending";
  const isUpdating = updateUser.status === "pending";
  const isRemoving = removeUser.status === "pending";

  if (isLoadingUsers || isLoadingPermissions) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-[28px] font-medium tracking-tight">
          Administration
        </h1>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>Invite User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="member">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isInviting}>
                  {isInviting ? "Sending..." : "Send Invitation"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MEMBER</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LAST LOGIN</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(({ node: user }) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {[user.is_superuser && "Super", user.is_staff && "Staff"]
                      .filter(Boolean)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.last_login
                      ? format(new Date(user.last_login), "PPp")
                      : "Never"}
                  </TableCell>
                  <TableCell className="w-8 p-2">
                    <div className="flex items-center gap-2">
                      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onClick={() => setSelectedUser(user)}
                              >
                                Edit user
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem
                              onClick={() => handleRemove(user)}
                              className="text-red-600"
                            >
                              Remove user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                              Update user information, status, and permissions.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit_full_name">Full Name</Label>
                              <Input
                                id="edit_full_name"
                                name="full_name"
                                defaultValue={selectedUser?.full_name}
                                required
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="is_staff"
                                name="is_staff"
                                defaultChecked={selectedUser?.is_staff}
                              />
                              <Label htmlFor="is_staff">Staff</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="is_active"
                                name="is_active"
                                defaultChecked={selectedUser?.is_active}
                              />
                              <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="space-y-2">
                              <Label>Permissions</Label>
                              <div className="space-y-2">
                                {permissionGroups.map(({ node: group }) => (
                                  <div key={group.id} className="space-y-2">
                                    <div className="font-medium">
                                      {group.name}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {group.permissions?.map((permission) => (
                                        <div
                                          key={permission}
                                          className="flex items-center space-x-2"
                                        >
                                          <Checkbox
                                            id={permission}
                                            name="permissions"
                                            value={permission}
                                            defaultChecked={selectedUser?.permissions?.includes(
                                              permission,
                                            )}
                                          />
                                          <Label htmlFor={permission}>
                                            {permission
                                              .replace(/_/g, " ")
                                              .toLowerCase()}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? "Saving..." : "Save Changes"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
