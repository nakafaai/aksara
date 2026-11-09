import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Lingkungan mendapat kesempatan untuk memulihkan diri",
        },
        {
          correct: false,
          label: "Bumi akan kembali persis seperti pada masa lampau",
        },
        {
          correct: false,
          label: "Seluruh bentuk polusi udara akan hilang",
        },
        {
          correct: false,
          label: "Kehidupan baru pasti tercipta tanpa campur tangan manusia",
        },
        {
          correct: false,
          label: "Keadaan Bumi akan menjadi tidak terkendali",
        },
      ],
    },
  },
};

export default item;
