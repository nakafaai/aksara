import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "ia menganggap turunnya jumlah pendengar sebagai alasan untuk meninggalkan studio sebelum siaran terakhir",
        },
        {
          isCorrect: false,
          label:
            "ia membersihkan kaset yang berjamur agar keputusan penutupan dapat dibatalkan oleh pengelola",
        },
        {
          isCorrect: true,
          label:
            "ia menerima keputusan dan meminta satu jam untuk acara perpisahan",
        },
        {
          isCorrect: false,
          label:
            "ia menunggu telepon studio berdering sebagai syarat untuk menerima keputusan pengelola",
        },
        {
          isCorrect: false,
          label:
            "ia memadamkan lampu mengudara lebih awal untuk menunjukkan penolakannya terhadap acara perpisahan",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
