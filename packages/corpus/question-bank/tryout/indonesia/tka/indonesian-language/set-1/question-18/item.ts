import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mira harus menunggu sepanjang hari di stasiun.",
        },
        {
          isCorrect: false,
          label:
            "Mira sebaiknya berhenti mengharapkan kepulangan Seno agar dapat melanjutkan hidup.",
        },
        {
          isCorrect: true,
          label: "Mira boleh berharap sambil tetap menjalani kegiatannya.",
        },
        {
          isCorrect: false,
          label: "Kursi kosong lebih penting daripada festival.",
        },
        {
          isCorrect: false,
          label: "Pak Damar ingin mengambil alih bagian biola Seno.",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
