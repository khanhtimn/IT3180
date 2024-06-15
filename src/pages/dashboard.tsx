import React, { useState } from "react";
import { api } from "@/utils/api";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { RecentSales } from "@/components/dashboard/recent-sales";
import Modal from "@/components/common/pop-up-modal";
import { DollarSign, User, Home, Activity } from "lucide-react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: residentCount = 0, isLoading: isLoadingCount, isError: isErrorCount, error: errorCount } = api.resident.getCount.useQuery();
  const { data: occupiedApartments = { count: 0, apartmentList: [] }, isLoading: isLoadingApartments, isError: isErrorApartments, error: errorApartments } = api.resident.getOccupiedApartments.useQuery();

  const handleViewApartments = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Trang chủ</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/*<Card>*/}
            {/*  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*    <CardTitle className="text-sm font-medium">*/}
            {/*      Total Revenue*/}
            {/*    </CardTitle>*/}
            {/*    <DollarSign className="h-4 w-4 text-muted-foreground" />*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div className="text-2xl font-bold">$45,231.89</div>*/}
            {/*    <p className="text-xs text-muted-foreground">*/}
            {/*      +20.1% from last month*/}
            {/*    </p>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cư dân
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoadingCount ? (
                  <div className="text-2xl font-bold">Loading...</div>
                ) : isErrorCount ? (
                  <div className="text-2xl font-bold">Error: {errorCount.message}</div>
                ) : (
                  <div className="text-2xl font-bold">{residentCount}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  Tổng số cư dân
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Số căn hộ đang có cư trú</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                {isLoadingApartments ? (
                  <div className="text-2xl font-bold">Đang tải...</div>
                ) : isErrorApartments ? (
                  <div className="text-2xl font-bold">Error: {errorApartments.message}</div>
                ) : (
                  <div className="text-2xl font-bold">{occupiedApartments.count}</div>
                )}
                <Button size="sm" onClick={handleViewApartments}>
                  Chi tiết
                </Button>
                </div>
              </CardContent>
            </Card>
            {/*<Card>*/}
            {/*  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*    <CardTitle className="text-sm font-medium">Active Now</CardTitle>*/}
            {/*    <Activity className="h-4 w-4 text-muted-foreground" />*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div className="text-2xl font-bold">+573</div>*/}
            {/*    <p className="text-xs text-muted-foreground">*/}
            {/*      +201 since last hour*/}
            {/*    </p>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/*<Card className="col-span-3">*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Recent Sales</CardTitle>*/}
            {/*    <CardDescription>*/}
            {/*      You made 265 sales this month.*/}
            {/*    </CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <RecentSales />*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apartmentList={occupiedApartments.apartmentList}
      />
    </div>
  );
};

export default Dashboard;
