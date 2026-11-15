import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "plastic-levy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\%$$, sama dengan penurunan jumlah kantong tipis",
        },
        {
          correct: false,
          label: "sekitar $$66\\%$$, dihitung dari jumlah semua kantong",
        },
        {
          correct: false,
          label:
            "sekitar $$46\\%$$, dengan berat sesudah cukai sebagai pembagi",
        },
        {
          correct: true,
          label: "sekitar $$32\\%$$, dari $$190$$ ton menjadi $$130$$ ton",
        },
        {
          correct: false,
          label:
            "sekitar $$68\\%$$, dengan $$130$$ ton sebagai besar penurunan",
        },
      ],
    },
  },
};

export default item;
