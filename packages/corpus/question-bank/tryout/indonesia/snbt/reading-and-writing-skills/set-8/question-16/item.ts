import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pelapor barang hilang memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat sebagai pelapor yang melaporkan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
