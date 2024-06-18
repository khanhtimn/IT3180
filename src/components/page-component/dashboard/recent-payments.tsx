import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Payment {
    apartmentNo: number;
    totalAmount: string;
    updateAt: string;
}

interface RecentSalesProps {
    payments: Payment[];
}

export function RecentPayments({ payments }: RecentSalesProps) {
    return (
      <div className="space-y-8">
          {payments.map((payment, index) => (
            <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
                    <AvatarFallback>{payment.apartmentNo.toString().slice(0, 3)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Căn hộ số {payment.apartmentNo}</p>
                    <p className="text-sm text-muted-foreground">{payment.updateAt}</p>
                </div>
                <div className="ml-auto font-medium">{payment.totalAmount}</div>
            </div>
          ))}
      </div>
    );
}
