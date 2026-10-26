import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Berendam di dalam lumpur",
        },
        {
          correct: false,
          label: "Bekerja dengan sangat sibuk",
        },
        {
          correct: false,
          label: "Berkumpul dalam satu kelompok",
        },
        {
          correct: true,
          label: "Terjebak dalam keadaan yang tidak menyenangkan",
        },
        {
          correct: false,
          label: "Berlumuran oleh suatu benda",
        },
      ],
    },
  },
};

export default item;
