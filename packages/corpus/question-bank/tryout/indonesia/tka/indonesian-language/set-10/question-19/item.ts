import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "lost-girl",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mbak Sari menanyakan alasannya lebih dulu jika suatu hari Arif terlambat pulang lagi",
        },
        {
          correct: false,
          label: "Arif berhenti membantu Mbak Sari membuat kue",
        },
        { correct: false, label: "Arif melarang Nisa datang ke rumahnya" },
        {
          correct: false,
          label: "Mbak Sari tidak pernah lagi menyuruh Arif ke pasar",
        },
        {
          correct: false,
          label: "ibu Nisa melaporkan Arif kepada petugas pos keamanan",
        },
      ],
    },
  },
};

export default item;
