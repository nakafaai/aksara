import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti mengumpulkan barang bekas.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu tidak jadi dilaksanakan kerja bakti karena turun hujan.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti membersihkan selokan dan mengumpulkan barang bekas.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu hanya selokan yang dibersihkan, sedangkan barang bekas tidak dikumpulkan.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu kerja bakti tidak dilaksanakan karena turun hujan.",
        },
      ],
    },
  },
};

export default item;
