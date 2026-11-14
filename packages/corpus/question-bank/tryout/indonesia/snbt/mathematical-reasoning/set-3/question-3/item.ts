import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bicycle-gears",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dengan gir belakang 12 gigi, satu putaran pedal memutar roda belakang 4 kali.",
        },
        {
          column: 2,
          label:
            "Dengan gir belakang 24 gigi dan 60 putaran pedal per menit, kecepatan sepeda adalah 16 km/jam.",
        },
        {
          column: 2,
          label:
            "Makin banyak gigi gir belakang yang dipakai, makin jauh jarak yang ditempuh sepeda untuk setiap putaran pedal.",
        },
        {
          column: 1,
          label:
            "Dengan gir belakang 16 gigi, menempuh 3,3 km memerlukan 500 putaran pedal.",
        },
      ],
    },
  },
};

export default item;
