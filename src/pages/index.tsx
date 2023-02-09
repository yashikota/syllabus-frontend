import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import { SortingState } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import type { Syllabus } from "../types/syllabus";

export type Row = {
  row: {
    original: Syllabus;
  };
};

const Table: FC<Row> = ({}) => {
  //optionally access the underlying virtualizer instance
  const virtualizerInstanceRef = useRef<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [data, setData] = useState<Syllabus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<MRT_ColumnDef<Syllabus>[]>(
    () => [
      {
        accessorKey: "lecture_title",
        header: "講義名",
        size: 200,
        filterFn: "contains",
      },
      {
        accessorKey: "department",
        header: "学部/学科",
        size: 200,
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "工学部", value: "工学部" },
          // { text: "工学部 共通科目", value: "工学部 共通科目" },
          { text: "工学部 キャリア形成の基礎", value: "工学部 キャリア形成の基礎" },
          { text: "工学部 工学の基礎", value: "工学部 工学の基礎" },
          { text: "工学部 都市デザイン工学科", value: "工学部 都市デザイン工学科" },
          { text: "工学部 建築学科", value: "工学部 建築学科" },
          { text: "工学部 電気電子システム工学科", value: "工学部 電気電子システム工学科" },
          { text: "工学部 機械工学科", value: "工学部 機械工学科" },
          { text: "工学部 応用化学科", value: "工学部 応用化学科" },
          { text: "工学部 電子情報通信工学科", value: "工学部 電子情報通信工学科" },
          { text: "工学部 電子情報システム工学科", value: "工学部 電子情報システム工学科" },
          { text: "工学部 環境工学科", value: "工学部 環境工学科" },
          { text: "工学部 空間デザイン学科", value: "工学部 空間デザイン学科" },
          { text: "工学部 生命工学科", value: "工学部 生命工学科" },
          { text: "工学部 ロボット工学科", value: "工学部 ロボット工学科" },
          { text: "工学部 数理科学と教育", value: "工学部 数理科学と教育" },
          { text: "工学部 その他連携科目", value: "工学部 その他連携科目" },
          // { text: "工学部 大学院先取履修科目", value: "工学部 大学院先取履修科目" },
          { text: "R&D工学部", value: "ロボティクス&デザイン工学部" },
          { text: "R&D工学部 共通科目", value: "ロボティクス&デザイン工学部 共通科目" },
          { text: "R&D工学部 その他連携科目", value: "ロボティクス&デザイン工学部 その他連携科目" },
          { text: "R&D工学部 専門横断科目", value: "ロボティクス&デザイン工学部 専門横断科目" },
          { text: "R&D工学部 ロボット工学科", value: "ロボティクス&デザイン工学部 ロボット工学科" },
          {
            text: "R&D工学部 システムデザイン工学科",
            value: "ロボティクス&デザイン工学部 システムデザイン工学科",
          },
          {
            text: "R&D工学部 空間デザイン学科",
            value: "ロボティクス&デザイン工学部 空間デザイン学科",
          },
          // { text: "R&D工学部 大学院先取履修科目", value: "ロボティクス&デザイン工学部 大学院先取履修科目" },
          { text: "情報科学部", value: "情報科学部" },
          { text: "情報科学部 共通科目", value: "情報科学部 共通科目" },
          { text: "情報科学部 コンピュータ科学科", value: "情報科学部 コンピュータ科学科" },
          { text: "情報科学部 情報知能学科", value: "情報科学部 情報知能学科" },
          { text: "情報科学部 情報システム学科", value: "情報科学部 情報システム学科" },
          { text: "情報科学部 情報メディア学科", value: "情報科学部 情報メディア学科" },
          { text: "情報科学部 情報ネットワーク学科", value: "情報科学部 情報ネットワーク学科" },
          {
            text: "情報科学部 ネットワークデザイン学科",
            value: "情報科学部 ネットワークデザイン学科",
          },
          { text: "情報科学部 データサイエンス学科", value: "情報科学部 データサイエンス学科" },
          { text: "知的財産学部", value: "知的財産学部" },
          // { text: "情報科学部 他学部科目", value: "情報科学部 他学部科目" },
          // { text: "知的財産学部 基礎教育科目", value: "知的財産学部 基礎教育科目" },
          { text: "知的財産学部 導入領域", value: "知的財産学部 導入領域" },
          { text: "知的財産学部 教養領域", value: "知的財産学部 教養領域" },
          { text: "知的財産学部 知的財産学科", value: "知的財産学部 知的財産学科" },
          { text: "知的財産学部 展開領域", value: "知的財産学部 展開領域" },
          // { text: "知的財産学部 その他連携科目", value: "知的財産学部 その他連携科目" },
          { text: "知的財産学部 その他連携領域", value: "知的財産学部 その他連携領域" },
          { text: "教職科目", value: "教職科目" },
          { text: "工学研究科 基礎および学際科目", value: "工学研究科 基礎および学際科目" },
          // { text: "工学研究科 都市デザイン工学専攻", value: "工学研究科 都市デザイン工学専攻" },
          // { text: "工学研究科 建築学専攻", value: "工学研究科 建築学専攻" },
          // { text: "工学研究科 電気電子工学専攻", value: "工学研究科 電気電子工学専攻" },
          // { text: "工学研究科 機械工学専攻", value: "工学研究科 機械工学専攻" },
          // { text: "工学研究科 応用化学専攻", value: "工学研究科 応用化学専攻" },
          // { text: "工学研究科 経営工学専攻", value: "工学研究科 経営工学専攻" },
          // { text: "工学研究科 環境工学専攻", value: "工学研究科 環境工学専攻" },
          // { text: "工学研究科 空間デザイン学専攻", value: "工学研究科 空間デザイン学専攻" },
          // { text: "工学研究科 生体医工学専攻", value: "工学研究科 生体医工学専攻" },
          {
            text: "工学研究科 建築・都市デザイン工学専攻",
            value: "工学研究科 建築・都市デザイン工学専攻",
          },
          { text: "工学研究科 電気電子・機械工学専攻", value: "工学研究科 電気電子・機械工学専攻" },
          {
            text: "工学研究科 化学・環境・生命工学専攻",
            value: "工学研究科 化学・環境・生命工学専攻",
          },
          {
            text: "R&D工学研究科 R&D工学専攻",
            value: "ロボティクス&デザイン工学研究科 ロボティクス&デザイン工学専攻",
          },
          { text: "情報科学研究科 情報科学専攻", value: "情報科学研究科 情報科学専攻" },
          { text: "知的財産研究科 知的財産専攻", value: "知的財産研究科 知的財産専攻" },
          // { text: "工学部 技術マネジメント学科", value: "工学部 技術マネジメント学科" },
          // { text: "工学部 生体医工学科", value: "工学部 生体医工学科" },
        ],
      },
      {
        accessorKey: "year",
        header: "年次",
        size: 70,
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "1年次", value: "1" },
          { text: "2年次", value: "2" },
          { text: "3年次", value: "3" },
          { text: "4年次", value: "4" },
        ],
      },
      {
        accessorKey: "term",
        header: "期間",
        size: 70,
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "前期", value: "前期" },
          { text: "後期", value: "後期" },
          { text: "通年", value: "通年" },
          { text: "研究", value: "研究" },
          { text: "集中", value: "集中" },
        ],
      },
      {
        accessorKey: "dow",
        header: "曜日",
        size: 70,
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "月曜日", value: "月曜日" },
          { text: "火曜日", value: "火曜日" },
          { text: "水曜日", value: "水曜日" },
          { text: "木曜日", value: "木曜日" },
          { text: "金曜日", value: "金曜日" },
          { text: "土曜日", value: "土曜日" },
          { text: "その他", value: "その他" },
        ],
      },
      {
        accessorKey: "period",
        header: "時限",
        size: 70,
        filterVariant: "multi-select",
        filterSelectOptions: [
          { text: "1時限", value: "1時限" },
          { text: "2時限", value: "2時限" },
          { text: "3時限", value: "3時限" },
          { text: "4時限", value: "4時限" },
          { text: "5時限", value: "5時限" },
          { text: "6時限", value: "6時限" },
          { text: "7時限", value: "7時限" },
          { text: "その他", value: "その他" },
        ],
      },
      {
        accessorKey: "credit",
        header: "単位",
        size: 70,
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
      },
      {
        accessorKey: "person",
        header: "担当者",
        size: 250,
      },
      {
        accessorKey: "numbering",
        header: "講義コード",
        size: 110,
      },
      {
        header: "詳細",
        size: 100,
        disableFilter: true,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Link href={`/${row.original.numbering}`}>
            <Button variant="outlined" color="inherit">
              詳細
            </Button>
          </Link>
        ),
      },
    ],
    [],
  );

  // データの取得
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022table.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (virtualizerInstanceRef.current) {
      //scroll to the top of the table when the sorting changes
      virtualizerInstanceRef.current.scrollToIndex(0);
    }
  }, [sorting]);

  // render table
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        // 設定
        enablePagination={false}
        enableBottomToolbar={false}
        // フィルター
        enableFilters={true}
        enableGlobalFilterModes={true}
        enableGlobalFilterRankedResults={true}
        enableColumnFilters={true}
        globalFilterFn="contains"
        muiTableHeadCellFilterTextFieldProps={
          {
            // SelectProps: { sx: { width: "100%" } },
          }
        }
        // ボタン無効化
        enableDensityToggle={false} // 行の高さ
        enableFullScreenToggle={false} // 全画面
        // 状態
        onSortingChange={setSorting}
        state={{ isLoading, sorting }}
        // 仮想化
        enableRowVirtualization
        rowVirtualizerInstanceRef={virtualizerInstanceRef} //optional
        rowVirtualizerProps={{ overscan: 10 }} //optionally customize the virtualizer
        // 初期状態
        muiTableContainerProps={{ sx: { maxHeight: "90.5vh" } }}
        initialState={{
          density: "compact",
          showColumnFilters: true,
          showGlobalFilter: true,
        }}
        muiTableBodyCellProps={{ sx: { whiteSpace: "normal" } }}
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
          filterByColumn: "フィルターを表示",
          hideColumn: "この列を非表示",
          showAllColumns: "列を表示",
          unsorted: "並び替えなし",
          sortedByColumnAsc: "昇順で並び替え",
          sortedByColumnDesc: "降順で並び替え",
          noRecordsToDisplay: "表示するレコードがありません",
          noResultsFound: "該当するシラバスが見つかりません",
        }}
      />

      {/* 上に戻るボタン */}
      <Fab
        color="primary"
        aria-label="Up"
        size="small"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onClick={() => {
          if (virtualizerInstanceRef.current) {
            virtualizerInstanceRef.current.scrollToIndex(0);
          }
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </>
  );
};

export default Table;
