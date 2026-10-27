import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "seat-seven",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mira harus menunggu sepanjang hari di stasiun.",
        },
        {
          correct: false,
          label:
            "Mira sebaiknya berhenti mengharapkan kepulangan Seno agar dapat melanjutkan hidup.",
        },
        {
          correct: true,
          label: "Mira boleh berharap sambil tetap menjalani kegiatannya.",
        },
        {
          correct: false,
          label: "Kursi kosong lebih penting daripada festival.",
        },
        {
          correct: false,
          label: "Pak Damar ingin mengambil alih bagian biola Seno.",
        },
      ],
    },
  },
};

export default item;
