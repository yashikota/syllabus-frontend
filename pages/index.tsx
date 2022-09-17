import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  Virtualizer,
} from "material-react-table";
import { SortingState } from "@tanstack/react-table";
import { Button } from "@mui/material";
import Link from "next/link";

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
        minSize: 100,
        size: 200,
      },
      {
        accessorKey: "year",
        header: "年次",
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "1年次", value: "1" },
          { text: "2年次", value: "2" },
          { text: "3年次", value: "3" },
          { text: "4年次", value: "4" },
        ],
        size: 60,
      },
      {
        accessorKey: "credit",
        header: "単位",
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "0単位", value: "0" },
          { text: "1単位", value: "1" },
          { text: "2単位", value: "2" },
          { text: "3単位", value: "3" },
          { text: "4単位", value: "4" },
          { text: "5単位", value: "5" },
          { text: "6単位", value: "6" },
          { text: "12単位", value: "12" },
        ],
        size: 60,
      },
      {
        accessorKey: "term",
        header: "期間",
        size: 100,
      },
      {
        accessorKey: "person",
        header: "担当者",
        minSize: 100,
      },
      {
        accessorKey: "numbering",
        header: "講義コード",
        minSize: 70,
      },
      {
        accessorKey: "department",
        header: "学部/学科",
        filterVariant: "multi-select",
        filterSelectOptions: [
          // { text: "工学部 共通科目", value: "OMY" },
          { text: "工学部 キャリア形成の基礎", value: "OMY1" },
          { text: "工学部 工学の基礎", value: "OMY2" },
          { text: "工学部 都市デザイン工学科", value: "C" },
          { text: "工学部 建築学科", value: "A" },
          { text: "工学部 電気電子システム工学科", value: "E" },
          { text: "工学部 機械工学科", value: "M" },
          { text: "工学部 応用化学科", value: "K" },
          { text: "工学部 電子情報通信工学科", value: "XD" },
          { text: "工学部 電子情報システム工学科", value: "D" },
          { text: "工学部 環境工学科", value: "V" },
          { text: "工学部 空間デザイン学科", value: "XW" },
          { text: "工学部 生命工学科", value: "U" },
          { text: "工学部 ロボット工学科", value: "XR" },
          { text: "工学部 数理科学と教育", value: "OMY3" },
          { text: "工学部 その他連携科目", value: "OMY4" },
          // { text: "工学部 大学院先取履修科目", value: "OMY5" },
          { text: "R&D工学部 共通科目", value: "UMD" },
          { text: "R&D工学部 その他連携科目", value: "UMD1" },
          { text: "R&D工学部 専門横断科目", value: "UMD2" },
          { text: "R&D工学部 ロボット工学科", value: "R" },
          { text: "R&D工学部 システムデザイン工学科", value: "S" },
          { text: "R&D工学部 空間デザイン学科", value: "W" },
          // { text: "R&D工学部 大学院先取履修科目", value: "UMD3" },
          { text: "情報科学部 共通科目", value: "HRKT" },
          { text: "情報科学部 コンピュータ科学科", value: "XIC" },
          { text: "情報科学部 情報知能学科", value: "IC" },
          { text: "情報科学部 情報システム学科", value: "IS" },
          { text: "情報科学部 情報メディア学科", value: "IM" },
          { text: "情報科学部 情報ネットワーク学科", value: "XIN" },
          { text: "情報科学部 ネットワークデザイン学科", value: "IN" },
          { text: "情報科学部 データサイエンス学科", value: "ID" },
          // { text: "情報科学部 他学部科目", value: "HRKT1" },
          // { text: "知的財産学部 基礎教育科目", value: "P" },
          { text: "知的財産学部 導入領域", value: "P1" },
          { text: "知的財産学部 教養領域", value: "P2" },
          { text: "知的財産学部 知的財産学科", value: "P3" },
          { text: "知的財産学部 展開領域", value: "P4" },
          // { text: "知的財産学部 その他連携科目", value: "P5" },
          { text: "知的財産学部 その他連携領域", value: "P6" },
          { text: "教職科目", value: "G" },
          { text: "工学研究科 基礎および学際科目", value: "YOMY" },
          // { text: "工学研究科 都市デザイン工学専攻", value: "XYC" },
          // { text: "工学研究科 建築学専攻", value: "XYA" },
          // { text: "工学研究科 電気電子工学専攻", value: "XYE" },
          // { text: "工学研究科 機械工学専攻", value: "XYM" },
          // { text: "工学研究科 応用化学専攻", value: "XYK" },
          // { text: "工学研究科 経営工学専攻", value: "XYF" },
          // { text: "工学研究科 環境工学専攻", value: "XYV" },
          // { text: "工学研究科 空間デザイン学専攻", value: "XYW" },
          // { text: "工学研究科 生体医工学専攻", value: "XYL" },
          { text: "工学研究科 建築・都市デザイン工学専攻", value: "YAC" },
          { text: "工学研究科 電気電子・機械工学専攻", value: "YEDM" },
          { text: "工学研究科 化学・環境・生命工学専攻", value: "YKVU" },
          { text: "R&D工学研究科 R&D工学専攻", value: "YUMD" },
          { text: "情報科学研究科 情報科学専攻", value: "YHRKT" },
          { text: "知的財産研究科 知的財産専攻", value: "YP" },
          // { text: "工学部 技術マネジメント学科", value: "XB" },
          // { text: "工学部 生体医工学科", value: "XL" },
        ],
        size: 100,
      },
      {
        accessorKey: "dow",
        header: "曜日",
        maxSize: 75,
      },
      {
        accessorKey: "period",
        header: "時限",
        maxSize: 75,
      },
      {
        accessorKey: "url",
        header: "URL",
        disableFilter: true,
        enableColumnFilter: false,
        Cell: ({}) => (
          <Link href="/1ECL30A0" passHref>
            <Button
              variant="outlined"
              color="inherit">
              詳細
            </Button>
          </Link>
        ),
        size: 100,
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
