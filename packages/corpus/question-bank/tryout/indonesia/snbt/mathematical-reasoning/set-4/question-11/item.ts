import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "scholarship-score",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Calon yang nilai akhirnya lebih dari $$90$$ pasti memenuhi syarat.",
        },
        {
          column: 1,
          label:
            "Jika ketiga pewawancara memberi nilai yang sama, lalu salah satu nilai itu dinaikkan $$8$$ poin, nilai akhir calon naik tepat $$1$$ poin.",
        },
        {
          column: 1,
          label:
            "Kenaikan nilai dari salah satu pewawancara bisa saja tidak mengubah nilai akhir calon sama sekali.",
        },
        {
          column: 2,
          label:
            "Dua calon dengan nilai $$T$$, $$R$$, dan $$P$$ yang sama serta jumlah nilai ketiga pewawancara yang sama pasti memiliki nilai akhir yang sama.",
        },
      ],
    },
  },
};

export default item;
