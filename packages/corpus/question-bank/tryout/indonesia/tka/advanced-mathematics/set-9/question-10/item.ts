import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Biaya sewa selama $$5$$ jam adalah $$\\text{Rp}30{.}000{,}00$$.",
        },
        {
          column: 1,
          label:
            "Biaya sewa selama $$1$$ jam sama dengan biaya sewa selama $$2$$ jam.",
        },
        {
          column: 1,
          label:
            "Dengan uang $$\\text{Rp}45{.}000{,}00$$, sepeda dapat disewa paling lama $$7$$ jam.",
        },
        {
          column: 2,
          label: "Fungsi $$B$$ mempunyai invers pada daerah asal $$t>0$$.",
        },
      ],
    },
  },
};

export default item;
