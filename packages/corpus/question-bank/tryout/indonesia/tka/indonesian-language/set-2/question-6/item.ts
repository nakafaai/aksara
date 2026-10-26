import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "mengganti label tanggal dengan urutan digital agar arsip lebih mudah dipindahkan",
        },
        {
          correct: false,
          label:
            "mempertahankan kaset di ruang siaran agar konteks aslinya tidak hilang",
        },
        {
          correct: false,
          label: "memutar paksa kaset yang rapuh",
        },
        {
          correct: true,
          label: "membantu mendata rekaman sebelum proses digitalisasi",
        },
        {
          correct: false,
          label: "mengambil alih laboratorium bahasa",
        },
      ],
    },
  },
  stimulus: "last-broadcast",
};

export default item;
