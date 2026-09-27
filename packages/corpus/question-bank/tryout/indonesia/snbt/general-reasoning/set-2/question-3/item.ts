import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Warga kehilangan motor",
        },
        {
          isCorrect: false,
          label: "Warga resah dan gelisah",
        },
        {
          isCorrect: true,
          label: "Petugas keamanan berpatroli secara rutin",
        },
        {
          isCorrect: false,
          label: "Hampir setiap minggu terjadi pencurian di Gang Mawar",
        },
        {
          isCorrect: false,
          label: "Petugas keamanan tidak berpatroli secara rutin",
        },
      ],
    },
  },
};

export default item;
