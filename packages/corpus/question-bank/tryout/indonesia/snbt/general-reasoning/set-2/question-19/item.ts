import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti mengumpulkan barang bekas.",
        },
        {
          correct: false,
          label:
            "Pada hari Minggu tidak jadi dilaksanakan kerja bakti karena turun hujan.",
        },
        {
          correct: false,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti membersihkan selokan dan mengumpulkan barang bekas.",
        },
        {
          correct: false,
          label:
            "Pada hari Minggu hanya selokan yang dibersihkan, sedangkan barang bekas tidak dikumpulkan.",
        },
        {
          correct: false,
          label:
            "Pada hari Minggu kerja bakti tidak dilaksanakan karena turun hujan.",
        },
      ],
    },
  },
};

export default item;
