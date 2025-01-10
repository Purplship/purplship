import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@karrio/insiders/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@karrio/insiders/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@karrio/insiders/components/ui/select";
import { Input } from "@karrio/insiders/components/ui/input";
import { Button } from "@karrio/insiders/components/ui/button";
import { Switch } from "@karrio/insiders/components/ui/switch";
import {
  GetSurcharges_surcharges as Surcharge,
  SurchargeTypeEnum,
} from "@karrio/types/graphql/admin/types";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().min(0, "Amount must be greater than 0"),
  surcharge_type: z.enum([
    SurchargeTypeEnum.AMOUNT,
    SurchargeTypeEnum.PERCENTAGE,
  ]),
  active: z.boolean().default(true),
  carriers: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  carrier_accounts: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SurchargeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValues) => Promise<void>;
  defaultValues?: Surcharge;
}

export function SurchargeDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: SurchargeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      amount: defaultValues?.amount || 0,
      surcharge_type:
        (defaultValues?.surcharge_type as SurchargeTypeEnum) ||
        SurchargeTypeEnum.AMOUNT,
      active: defaultValues?.active ?? true,
      carriers: defaultValues?.carriers || [],
      services: defaultValues?.services || [],
      carrier_accounts: defaultValues?.carrier_accounts?.map((a) => a.id) || [],
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      await onSubmit(values);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Surcharge" : "Create Surcharge"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues
              ? "Update the surcharge details below"
              : "Add a new surcharge to your system"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter surcharge name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surcharge_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select surcharge type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AMOUNT">Fixed Amount</SelectItem>
                      <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Active</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {defaultValues ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
