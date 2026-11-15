import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$150$$ orang, karena program A dan C isinya sama sehingga semua memilihnya",
        },
        {
          correct: false,
          label:
            "$$225$$ orang, yaitu $$75\\%$$ dari $$300$$ orang, rata-rata kedua persentase",
        },
        {
          correct: false,
          label:
            "$$108$$ orang, yaitu yang memilih program A di kelompok pertama saja",
        },
        {
          correct: false,
          label:
            "$$33$$ orang, yaitu yang memilih program C di kelompok kedua saja",
        },
        {
          correct: true,
          label:
            "$$141$$ orang, yaitu $$108$$ dari kelompok pertama dan $$33$$ dari kelompok kedua",
        },
      ],
    },
  },
};

export default item;
