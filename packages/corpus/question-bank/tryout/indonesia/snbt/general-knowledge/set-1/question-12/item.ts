import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "memberikan penjelasan atau tanggapan.",
        },
        {
          isCorrect: false,
          label: "menyangkal sesuatu hal.",
        },
        {
          isCorrect: false,
          label: "kegiatan menawar sesuatu.",
        },
        {
          isCorrect: false,
          label: "membicarakan sesuatu hal.",
        },
        {
          isCorrect: false,
          label: "berdiskusi tentang sesuatu.",
        },
      ],
    },
  },
};

export default item;
