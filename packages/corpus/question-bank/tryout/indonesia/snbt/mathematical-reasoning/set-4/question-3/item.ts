import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "time-zones",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Lama penerbangan P2 adalah 3 jam 45 menit." },
        {
          column: 2,
          label:
            "Ketika pesawat P1 mendarat di Makassar, waktu di Jakarta adalah pukul 11.05 WIB.",
        },
        {
          column: 2,
          label:
            "Penumpang yang turun dari P1 lalu naik P2 menunggu di Makassar lebih dari 1,5 jam.",
        },
        {
          column: 1,
          label: "Jumlah lama penerbangan P1 dan P2 adalah 6 jam 10 menit.",
        },
      ],
    },
  },
};

export default item;
