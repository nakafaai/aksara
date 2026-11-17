import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Final sum $$0$$ and carry $$1$$, which is two",
        },
        {
          correct: false,
          label: "Final sum $$1$$ and carry $$0$$, which is one",
        },
        {
          correct: false,
          label: "Final sum $$1$$ and carry $$1$$, which is eleven",
        },
        {
          correct: true,
          label: "Final sum $$1$$ and carry $$1$$, which is three",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hasil tambah akhir $$0$$ dan bawa $$1$$, iaitu dua",
        },
        {
          correct: false,
          label: "Hasil tambah akhir $$1$$ dan bawa $$0$$, iaitu satu",
        },
        {
          correct: false,
          label: "Hasil tambah akhir $$1$$ dan bawa $$1$$, iaitu sebelas",
        },
        {
          correct: true,
          label: "Hasil tambah akhir $$1$$ dan bawa $$1$$, iaitu tiga",
        },
      ],
    },
  },
};

export default item;
