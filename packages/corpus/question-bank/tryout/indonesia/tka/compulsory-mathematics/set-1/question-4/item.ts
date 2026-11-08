import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Mesin $$A$$ adalah mesin yang paling cepat.",
        },
        {
          column: 2,
          label: "Mesin $$B$$ mencetak $$30$$ lembar per menit.",
        },
        {
          column: 1,
          label: "Mesin $$C$$ sendiri memerlukan $$40$$ menit untuk mencetak $$1{.}200$$ lembar.",
        },
        {
          column: 1,
          label: "Ketiga mesin bersama-sama mencetak $$2{.}700$$ lembar dalam $$30$$ menit.",
        },
      ],
    },
  },
};

export default item;
