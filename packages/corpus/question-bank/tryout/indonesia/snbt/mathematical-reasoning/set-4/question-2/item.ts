import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "car-rental",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Untuk sewa $$3$$ hari, ada jarak total di atas jatah Paket B yang membuat Paket A lebih murah daripada Paket B.",
        },
        {
          column: 2,
          label:
            "Untuk sewa $$3$$ hari, jika jarak total lebih dari $$450\\text{ km}$$, Paket C pasti menjadi paket termurah.",
        },
        {
          column: 1,
          label:
            "Dengan jarak total $$700\\text{ km}$$, sewa Paket B selama $$5$$ hari lebih murah daripada sewa Paket B selama $$4$$ hari.",
        },
        {
          column: 1,
          label:
            "Untuk sewa $$3$$ hari dengan jarak total $$600\\text{ km}$$, ketiga paket memerlukan biaya yang sama.",
        },
      ],
    },
  },
};

export default item;
