import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ferry-crossing",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dengan aturan antre, kapal berangkat pada perjalanan pertama dengan muatan tepat $$30\\text{ ton}$$.",
        },
        {
          column: 2,
          label:
            "Jika mobil pada urutan ketiga batal menyeberang, aturan antre tetap memerlukan $$5$$ perjalanan untuk menghabiskan antrean.",
        },
        {
          column: 1,
          label:
            "Jika batas massa kapal diganti menjadi $$31\\text{ ton}$$ dan panjang lajur tetap $$40\\text{ m}$$, aturan antre menghabiskan antrean dalam $$4$$ perjalanan.",
        },
        {
          column: 2,
          label:
            "Jika truk pada urutan kesembilan dipindahkan ke urutan paling belakang, aturan antre menghabiskan antrean dalam $$4$$ perjalanan.",
        },
      ],
    },
  },
};

export default item;
