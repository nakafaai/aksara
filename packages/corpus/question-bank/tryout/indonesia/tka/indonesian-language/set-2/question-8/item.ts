import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "membantu mendata rekaman sebelum proses digitalisasi",
        },
        {
          isCorrect: false,
          label: "menghapus label tanggal pada semua kaset",
        },
        {
          isCorrect: false,
          label: "menolak bantuan guru sejarah",
        },
        {
          isCorrect: false,
          label: "memutar paksa kaset yang rapuh",
        },
        {
          isCorrect: false,
          label: "mengambil alih laboratorium bahasa",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
