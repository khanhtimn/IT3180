import React, { useState } from "react";
import { api } from "@/utils/api";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentPayments } from "@/components/page-component/dashboard/recent-payments";
import Modal from "@/components/page-component/dashboard/apartment-modal";
import { DollarSign, User, Home, Activity } from "lucide-react";
import {format} from "date-fns";
import {Loading} from "@/components/common/loading";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: residentCount = 0, isLoading: isLoadingCount, isError: isErrorCount, error: errorCount } = api.resident.getCount.useQuery();
  const { data: occupiedApartments = { count: 0, apartmentList: [] }, isLoading: isLoadingApartments, isError: isErrorApartments, error: errorApartments } = api.resident.getOccupiedApartments.useQuery();
  const { data: totalContributionData, isLoading: isTotalContributionLoading } = api.fee.getTotalContributionFee.useQuery();
  const { currentMonthTotal = 0, percentageChange = 0, allTimeTotal = 0 } = totalContributionData || {};

  const { data: recentPaymentsData, isLoading: isRecentPaymentsLoading } = api.fee.getRecentPayments.useQuery();
  const recentPayments = recentPaymentsData || [];

  if (isTotalContributionLoading || isRecentPaymentsLoading) {
    return <Loading />;
  }

  const handleViewApartments = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Thông tin chung</h2>
          {/*<div className="flex items-center space-x-2">*/}
          {/*  <CalendarDateRangePicker />*/}
          {/*</div>*/}
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Phí đóng góp tháng {format(new Date(), 'MM/yyyy')}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentMonthTotal.toLocaleString('fr')}₫
                </div>
                <p className="text-xs text-muted-foreground">
                  {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}% so với tháng trước
                </p>
                <p className="text-xs text-muted-foreground">
                  Tổng phí đóng góp: {allTimeTotal.toLocaleString('fr')}₫
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cư dân
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground"/>
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
                  <Loading />
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
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Thanh toán gần đây</CardTitle>
                <CardDescription>
                  Chung cư có {recentPayments.length} thanh toán mới
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPayments payments={recentPayments} />
              </CardContent>
            </Card>
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
