import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "calendar-2027",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Tanggal 1 Januari 2028 jatuh pada hari Sabtu." },
        { column: 1, label: "Tanggal 31 Desember 2027 jatuh pada hari Jumat." },
        { column: 2, label: "Tanggal 1 Maret 2027 jatuh pada hari Minggu." },
        { column: 2, label: "Dalam tahun 2027 terdapat 53 hari Sabtu." },
      ],
    },
  },
};

export default item;
