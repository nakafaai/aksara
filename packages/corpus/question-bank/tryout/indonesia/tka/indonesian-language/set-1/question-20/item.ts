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
          label: "penantian selalu berakhir dengan kepulangan",
        },
        {
          isCorrect: false,
          label: "pertunjukan hanya berhasil jika semua pemain hadir",
        },
        {
          isCorrect: true,
          label: "harapan dapat berubah bentuk tanpa harus hilang",
        },
        {
          isCorrect: false,
          label: "kursi kosong tidak mempunyai makna apa pun",
        },
        {
          isCorrect: false,
          label: "Mira memutuskan berhenti bermain biola",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
