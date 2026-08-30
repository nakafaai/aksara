import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "memaksa Nara membuang seluruh layangan",
        },
        {
          isCorrect: true,
          label:
            "menghargai proses dan membiarkan Nara menemukan maknanya sendiri",
        },
        {
          isCorrect: false,
          label: "hanya peduli pada hadiah hiasan",
        },
        {
          isCorrect: false,
          label: "menolak menguji hasil perbaikan",
        },
        {
          isCorrect: false,
          label: "menyembunyikan semua kesalahan dari Nara",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
