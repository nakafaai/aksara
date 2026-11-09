import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "tempe-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Benang-benang miselium kapang yang menjalar di antara butir kedelai.",
        },
        {
          correct: false,
          label:
            "Air rebusan yang mengering dan menjadi lengket di sekitar butir kedelai.",
        },
        {
          correct: false,
          label:
            "Daun pisang yang menekan butir-butir kedelai selama satu sampai dua hari.",
        },
        {
          correct: false,
          label:
            "Bakteri penghasil vitamin B12 yang menempel pada kulit kedelai.",
        },
        {
          correct: false,
          label:
            "Enzim dari kedelai sendiri yang mungkin keluar ketika kedelai direndam.",
        },
      ],
    },
  },
};

export default item;
