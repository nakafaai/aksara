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
          isCorrect: false,
          label:
            "Dara memilih rekaman lama sebagai pengganti siaran suara alumni",
        },
        {
          isCorrect: false,
          label:
            "Bimo memindahkan kaset berjamur ke ruang siaran sebelum proses digitalisasi",
        },
        {
          isCorrect: false,
          label: "kepala sekolah membatalkan laboratorium bahasa",
        },
        {
          isCorrect: false,
          label: "penjaga sekolah menanam pohon baru saat siaran",
        },
        {
          isCorrect: true,
          label: "Dara menyajikan rekaman lama beserta konteksnya",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
