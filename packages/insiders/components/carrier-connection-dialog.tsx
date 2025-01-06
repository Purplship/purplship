import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GetSystemConnections_system_carrier_connections as BaseConnection } from "@karrio/types/graphql/admin/types";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MetadataEditor } from "./ui/metadata-editor";

type Connection = BaseConnection & {
  credentials?: Record<string, any>;
  config?: Record<string, any>;
};

const formSchema = z.object({
  id: z.string(),
  carrier_name: z.string(),
  display_name: z.string(),
  test_mode: z.boolean(),
  active: z.boolean(),
  capabilities: z.array(z.string()),
  credentials: z.record(z.any()).optional(),
  config: z.record(z.any()).optional(),
});

interface CarrierConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedConnection: Connection | null;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function CarrierConnectionDialog({
  open,
  onOpenChange,
  selectedConnection,
  onSubmit,
}: CarrierConnectionDialogProps) {
  const { references } = useAPIMetadata();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      carrier_name: "",
      display_name: "",
      test_mode: false,
      active: false,
      capabilities: [],
      credentials: {},
      config: {},
    },
  });

  const handleModalClose = () => {
    setIsConfigOpen(false);
    setIsMetadataOpen(false);
    requestAnimationFrame(() => {
      form.reset({
        id: "",
        carrier_name: "",
        display_name: "",
        test_mode: false,
        active: false,
        capabilities: [],
        credentials: {},
        config: {},
      });
    });
    onOpenChange(false);
  };

  const formatLabel = (label: string) => {
    return label
      .split(/[\s_-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const renderCredentialFields = () => {
    const carrierName = form.watch("carrier_name");
    const fields = references?.connection_fields?.[carrierName] || {};

    return Object.entries(fields).map(([key, field]) => (
      <FormField
        key={key}
        control={form.control}
        name={`credentials.${key}`}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{formatLabel(field.name)}</FormLabel>
            <FormControl>
              {field.type === "string" && !field.enum ? (
                <Input {...formField} />
              ) : field.type === "string" && field.enum ? (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {field.enum.map((option) => (
                      <SelectItem key={option} value={option}>
                        {formatLabel(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "boolean" ? (
                <Switch
                  checked={formField.value}
                  onCheckedChange={formField.onChange}
                />
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  const renderConfigFields = () => {
    const carrierName = form.watch("carrier_name");
    const configs = references?.connection_configs?.[carrierName] || {};

    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(configs)
          .filter(
            ([key, _]) =>
              ![
                "brand_color",
                "text_color",
                "shipping_services",
                "shipping_options",
              ].includes(key),
          )
          .map(([key, config]) => (
            <FormField
              key={key}
              control={form.control}
              name={`config.${key}`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{formatLabel(config.name)}</FormLabel>
                  <FormControl>
                    {config.type === "string" && !config.enum ? (
                      <Input {...formField} />
                    ) : config.type === "string" && config.enum ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {config.enum.map((option) => (
                            <SelectItem key={option} value={option}>
                              {formatLabel(option)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : config.type === "boolean" ? (
                      <Switch
                        checked={formField.value}
                        onCheckedChange={formField.onChange}
                      />
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

        {configs["brand_color"] && (
          <FormField
            control={form.control}
            name="config.brand_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {configs["text_color"] && (
          <FormField
            control={form.control}
            name="config.text_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {configs["shipping_services"] && (
          <FormField
            control={form.control}
            name="config.shipping_services"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Preferred Shipping Services</FormLabel>
                <FormControl>
                  <div className="rounded-md border">
                    <div className="p-3 space-y-1.5 max-h-[160px] overflow-y-auto">
                      {Object.entries(
                        references?.service_names?.[carrierName] || {},
                      ).map(([value, label]) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2 py-0.5 px-1 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            id={`service-${value}`}
                            checked={(field.value || []).includes(value)}
                            onChange={(e) => {
                              const values = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...values, value]);
                              } else {
                                field.onChange(
                                  values.filter((v) => v !== value),
                                );
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label
                            htmlFor={`service-${value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {formatLabel(label as string)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {configs["shipping_options"] && (
          <FormField
            control={form.control}
            name="config.shipping_options"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Carrier Specific Shipping Options</FormLabel>
                <FormControl>
                  <div className="rounded-md border">
                    <div className="p-3 space-y-1.5 max-h-[160px] overflow-y-auto">
                      {Object.entries(
                        references?.option_names?.[carrierName] || {},
                      ).map(([value, label]) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2 py-0.5 px-1 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            id={`option-${value}`}
                            checked={(field.value || []).includes(value)}
                            onChange={(e) => {
                              const values = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...values, value]);
                              } else {
                                field.onChange(
                                  values.filter((v) => v !== value),
                                );
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label
                            htmlFor={`option-${value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {formatLabel(label as string)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="shrink-0 p-6 border-b">
          <DialogTitle>
            {selectedConnection ? "Edit Connection" : "Add Connection"}
          </DialogTitle>
          <DialogDescription>
            Update carrier connection details and credentials.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="carrier_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carrier</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a carrier" />
                            </SelectTrigger>
                            <SelectContent>
                              {references?.carriers &&
                                Object.entries(references.carriers)
                                  .sort()
                                  .map(([carrier, label]) => (
                                    <SelectItem key={carrier} value={carrier}>
                                      {label}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="display_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="test_mode"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Test Mode</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Active</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {form.watch("carrier_name") && (
                  <>
                    <div className="space-y-4">{renderCredentialFields()}</div>

                    {Object.keys(
                      references?.connection_configs?.[
                        form.watch("carrier_name")
                      ] || {},
                    ).length > 0 && (
                      <div className="space-y-4">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg border p-4 text-left text-sm font-medium hover:bg-gray-100"
                          onClick={() => setIsConfigOpen(!isConfigOpen)}
                        >
                          <span>Connection Config</span>
                          {isConfigOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {isConfigOpen && (
                          <div className="space-y-4 rounded-lg border p-4">
                            {renderConfigFields()}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg border p-4 text-left text-sm font-medium hover:bg-gray-100"
                        onClick={() => setIsMetadataOpen(!isMetadataOpen)}
                      >
                        <span>Metadata</span>
                        {isMetadataOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {isMetadataOpen && (
                        <div className="space-y-4 rounded-lg border p-4">
                          <MetadataEditor
                            value={form.watch("config.metadata") || {}}
                            onChange={(metadata) => {
                              form.setValue("config.metadata", metadata);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="shrink-0 p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
