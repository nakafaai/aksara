import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "office-elevator",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Waktu satu kali berhenti sama dengan waktu lift bergerak sejauh 6 lantai.",
        },
        {
          column: 2,
          label:
            "Berhenti di 2 lantai di tengah perjalanan menambah waktu perjalanan sebanyak 12 detik.",
        },
        {
          column: 2,
          label:
            "Lift yang naik dari lantai 3 ke lantai 11, lalu langsung turun ke lantai 6, bergerak selama 22 detik, tidak termasuk waktu berhenti.",
        },
        {
          column: 1,
          label:
            "Lift dapat mengangkut 11 orang yang berat rata-ratanya 62 kg dalam satu kali jalan.",
        },
      ],
    },
  },
};

export default item;
