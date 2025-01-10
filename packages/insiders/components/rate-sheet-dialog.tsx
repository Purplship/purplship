import { RateSheetModalEditor } from "@karrio/ui/modals/rate-sheet-editor";
import { Dialog, DialogContent } from "./ui/dialog";

interface RateSheetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRateSheet?: any;
  onSubmit: (values: any) => Promise<any>;
}

export function RateSheetDialog({
  open,
  onOpenChange,
  selectedRateSheet,
  onSubmit,
}: RateSheetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <RateSheetModalEditor
          trigger={<div />}
          header={selectedRateSheet ? "Edit Rate Sheet" : "Add Rate Sheet"}
          sheet={selectedRateSheet}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
