import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { PlusCircle, X } from "lucide-react";

export type MetadataValue = string | number | boolean | null;
export type Metadata = Record<string, MetadataValue>;

interface MetadataEditorProps {
  value?: Metadata;
  onChange?: (metadata: Metadata) => void;
  className?: string;
}

export function MetadataEditor({
  value = {},
  onChange,
  className = "",
}: MetadataEditorProps) {
  const [metadata, setMetadata] = useState<Metadata>(value);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (!newKey.trim()) return;

    const updatedMetadata = {
      ...metadata,
      [newKey]: newValue,
    };
    setMetadata(updatedMetadata);
    onChange?.(updatedMetadata);
    setNewKey("");
    setNewValue("");
  };

  const handleRemove = (key: string) => {
    const { [key]: _, ...rest } = metadata;
    setMetadata(rest);
    onChange?.(rest);
  };

  const handleUpdate = (key: string, value: string) => {
    const updatedMetadata = {
      ...metadata,
      [key]: value,
    };
    setMetadata(updatedMetadata);
    onChange?.(updatedMetadata);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <Input value={key} disabled className="flex-1 bg-gray-50" />
            <Input
              value={value?.toString() ?? ""}
              onChange={(e) => handleUpdate(key, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(key)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Enter key"
          />
        </div>
        <div className="flex-1">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAdd}
          className="h-10 w-10"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
