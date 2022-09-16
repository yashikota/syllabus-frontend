import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  Virtualizer,
} from "material-react-table";
import { SortingState } from "@tanstack/react-table";
import { Button } from "@mui/material";

// 型定義
export type Syllabus = {
  lecture_title: string;
  year: string;
  credit: string;
  term: string;
  person: string;
  numbering: string;
  department: string;
  url: string;
  dow: string;
  period: string;
};

const Table: FC = () => {
  //optionally access the underlying virtualizer instance
  const virtualizerInstanceRef = useRef<Virtualizer>(null);

  const [data, setData] = useState<Syllabus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<MRT_ColumnDef<Syllabus>[]>(
    () => [
      {
        accessorKey: "lecture_title",
        header: "講義名",
        size: 200,
      },
      {
        accessorKey: "year",
        header: "年次",
        filterVariant: "select",
        filterSelectOptions: ["1", "2", "3", "4"],
        size: 50,
      },
      {
        accessorKey: "credit",
        header: "単位",
        filterVariant: "select",
        filterSelectOptions: ["0", "1", "2", "3", "4", "5", "6", "12"],
        size: 50,
      },
      {
        accessorKey: "term",
        header: "期間",
        size: 100,
      },
      {
        accessorKey: "person",
        header: "担当者",
        size: 100,
      },
      {
        accessorKey: "numbering",
        header: "講義コード",
        maxSize: 100,
      },
      {
        accessorKey: "department",
        header: "学部/学科",
        filterVariant: "select",
        size: 50,
      },
      {
        accessorKey: "dow",
        header: "曜日",
        maxSize: 75,
      },
      {
        accessorKey: "period",
        header: "時限",
        maxSize: 80,
      },
      {
        accessorKey: "url",
        header: "URL",
        size: 100,
        render: (row: { link: string; }) =>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            href={row.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            公式シラバス
          </Button>
      },
    ],
    [],
  );

  // データの取得
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022table.json")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    if (virtualizerInstanceRef.current) {
      //scroll to the top of the table when the sorting changes
      virtualizerInstanceRef.current.scrollToIndex(0);
    }
  }, [sorting]);

  // render table
  return (
    <MaterialReactTable
      columns={columns}
      data={data}

      // 設定
      enablePagination={false}
      enableBottomToolbar={false}

      // フィルター
      enableFilters={true}
      enableGlobalFilterModes={false}

      // ボタン無効化
      enableDensityToggle={false} // 行の高さ
      enableFullScreenToggle={false} // 全画面

      // 状態
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}

      // 仮想化
      enableRowVirtualization
      virtualizerInstanceRef={virtualizerInstanceRef} //optional
      virtualizerProps={{ overscan: 20 }} //optionally customize the virtualizer

      // 初期状態
      muiTableContainerProps={{ sx: { maxHeight: "95vh" } }}
      initialState={{
        density: "comfortable",
        showColumnFilters: true,
        showGlobalFilter: true,
      }}

      // 翻訳
      localization={{
        search: "検索",
        showHideFilters: "フィルターを表示/非表示",
        showHideColumns: "列の表示/非表示",
        hideAll: "すべて非表示",
        showAll: "すべて表示",
        columnActions: "メニューの表示",
        clearSort: "並び替えをクリア",
        sortByColumnAsc: "昇順で並び替え",
        sortByColumnDesc: "降順で並び替え",
        clearFilter: "フィルターをクリア",
        filterByColumn: "filter",
        hideColumn: "列を非表示",
        showAllColumns: "すべての列を表示",
        unsorted: "並び替えなし",
        sortedByColumnAsc: "昇順で並び替え",
        sortedByColumnDesc: "降順で並び替え",
        noRecordsToDisplay: "表示するレコードがありません",
        noResultsFound: "結果が見つかりません",
      }}
    />
  );
};

export default Table;
