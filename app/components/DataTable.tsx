"use client";

import { useRouter } from "next/navigation";
import { Table, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface DataTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<TableProps<T>, "columns" | "dataSource" | "rowKey"> {
  columns: ColumnsType<T>;
  dataSource: readonly T[] | T[];
  rowKey?: string | ((record: T, index?: number) => string);
  pagination?: TableProps<T>["pagination"] | false;
  onRowClick?: (record: T) => void;
  getRowUrl?: (record: T) => string | null;
  emptyText?: string;
  className?: string;
  ariaLabel?: string;
}

export function DataTable<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  dataSource,
  rowKey,
  pagination = false,
  onRowClick,
  getRowUrl,
  emptyText,
  className,
  ariaLabel,
  bordered = false,
  ...restProps
}: DataTableProps<T>) {
  const router = useRouter();

  const tablePagination =
    pagination === false
      ? false
      : {
          showSizeChanger: true,
          ...pagination,
        };

  const rowProps = onRowClick
    ? (record: T) => {
        const url = getRowUrl ? getRowUrl(record) : null;

        return {
          onClick: () => onRowClick(record),
          onMouseEnter: url
            ? () => {
                // Prefetch the route on hover for faster navigation
                router.prefetch(url);
              }
            : undefined,
          style: { cursor: "pointer" as const },
        };
      }
    : undefined;

  const tableRowKey =
    rowKey || ((record: T, index?: number) => String(index ?? Math.random()));

  return (
    <Table<T>
      rowKey={tableRowKey}
      columns={columns}
      dataSource={dataSource}
      pagination={tablePagination}
      onRow={rowProps}
      bordered={bordered}
      locale={
        emptyText !== undefined ? { emptyText } : { emptyText: () => null }
      }
      aria-label={ariaLabel}
      className={className}
      {...restProps}
    />
  );
}
