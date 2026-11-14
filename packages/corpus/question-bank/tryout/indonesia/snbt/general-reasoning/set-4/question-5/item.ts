import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "dompet",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada April, rata-rata omzet harian seluruh $$120$$ pedagang adalah $$\\text{Rp}1{,}6$$ juta.",
        },
        {
          column: 2,
          label:
            "Total omzet harian seluruh pedagang pada Juli lebih rendah daripada total omzet harian seluruh pedagang pada April.",
        },
        {
          column: 1,
          label:
            "Omzet harian gabungan semua pengguna dompet digital pada Juli lebih dari $$1{,}5$$ kali omzet harian gabungan semua pengguna pada April.",
        },
        {
          column: 1,
          label:
            "Pada April, pedagang bukan pengguna menyumbang lebih dari $$60\\%$$ total omzet harian seluruh pasar.",
        },
      ],
    },
  },
};

export default item;
