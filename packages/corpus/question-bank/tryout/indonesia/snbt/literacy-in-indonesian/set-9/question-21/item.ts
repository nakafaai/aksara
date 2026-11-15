import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "pantun-tradition",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf pertama melaporkan pengakuan resmi, dan paragraf terakhir menegaskan bahwa pengakuan itu sudah cukup untuk menjaga pantun.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama menolak pengajuan bersama, dan paragraf terakhir mengusulkan agar pantun diajukan ulang oleh satu negara.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama dan paragraf terakhir sama-sama menjelaskan bentuk pantun, yaitu empat baris berima a-b-a-b.",
        },
        {
          correct: true,
          label:
            "Paragraf pertama melaporkan pengakuan resmi, dan paragraf terakhir membatasi arti pengakuan itu: sertifikat hanya mencatat, sedangkan pantun hidup bila terus dipakai.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama melaporkan pengakuan resmi, dan paragraf terakhir menjelaskan bahwa UNESCO akan mencabut pengakuan itu bila pantun tidak lagi dipakai.",
        },
      ],
    },
  },
};

export default item;
