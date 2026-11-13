import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Perbandingan luas segitiga $$ADE$$ dan luas trapesium $$DBCE$$ adalah $$4:9$$.",
        },
        {
          column: 2,
          label:
            "Perbandingan keliling segitiga $$ADE$$ dan keliling trapesium $$DBCE$$ selalu sama, berapa pun panjang $$AB$$ dan $$AC$$.",
        },
        {
          column: 1,
          label:
            "Ruas garis di dalam trapesium $$DBCE$$ yang sejajar $$BC$$ dan membagi trapesium itu menjadi dua bagian yang luasnya sama mempunyai panjang $$2\\sqrt{58}$$ cm.",
        },
      ],
    },
  },
};

export default item;
