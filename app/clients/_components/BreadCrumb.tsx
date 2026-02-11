"use client";
import React from "react";
import { Breadcrumb } from "antd";

export interface BreadcrumbItemType {
  title: string;
  type: "client" | "organisation";
  data: any;
}

interface BreadCrumbProps {
  items: BreadcrumbItemType[];
  onNavigate: (index: number) => void;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, onNavigate }) => {
  const breadcrumbItems = items.map((item, index) => ({
    title: (
      <span
        className={
          index < items.length - 1 ? "cursor-pointer hover:text-blue-500" : ""
        }
        onClick={() => index < items.length - 1 && onNavigate(index)}
      >
        {item.title}
      </span>
    ),
  }));

  return <Breadcrumb items={breadcrumbItems} />;
};

export default BreadCrumb;
