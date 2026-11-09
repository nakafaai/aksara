import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause-and-sign",
  },
  stimulus: "tsunami",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Gempa yang membuat dasar laut terangkat secara tiba-tiba",
        },
        {
          column: 1,
          label: "Longsoran besar di bawah laut",
        },
        {
          column: 2,
          label: "Surutnya air laut sebelum gelombang tiba",
        },
        {
          column: 2,
          label:
            "Gempa sangat dalam yang hampir tidak mengubah bentuk dasar laut",
        },
      ],
    },
  },
};

export default item;
