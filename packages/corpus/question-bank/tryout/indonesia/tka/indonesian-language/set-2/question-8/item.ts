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
          isCorrect: false,
          label:
            "mengganti label tanggal dengan urutan digital agar arsip lebih mudah dipindahkan",
        },
        {
          isCorrect: false,
          label:
            "mempertahankan kaset di ruang siaran agar konteks aslinya tidak hilang",
        },
        {
          isCorrect: false,
          label: "memutar paksa kaset yang rapuh",
        },
        {
          isCorrect: true,
          label: "membantu mendata rekaman sebelum proses digitalisasi",
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
