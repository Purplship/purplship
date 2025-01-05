import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@karrio/insiders/components/ui/card";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-medium tracking-tight">
          Administration
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr,200px,200px] gap-4 text-sm">
              <div className="font-medium text-muted-foreground">MEMBER</div>
              <div className="font-medium text-muted-foreground">ROLE</div>
              <div className="font-medium text-muted-foreground">
                LAST LOGIN
              </div>
            </div>
            <div className="grid grid-cols-[1fr,200px,200px] gap-4 text-sm">
              <div>admin@example.com</div>
              <div>Super, Staff</div>
              <div>Thu, Mar 14, 2024 11:45 PM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
