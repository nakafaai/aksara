import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Dara menyajikan rekaman lama beserta konteksnya",
        },
        {
          isCorrect: false,
          label: "Dara menolak menyiarkan suara alumni",
        },
        {
          isCorrect: false,
          label: "Bimo memperbaiki semua kaset berjamur",
        },
        {
          isCorrect: false,
          label: "kepala sekolah membatalkan laboratorium bahasa",
        },
        {
          isCorrect: false,
          label: "penjaga sekolah menanam pohon baru saat siaran",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
