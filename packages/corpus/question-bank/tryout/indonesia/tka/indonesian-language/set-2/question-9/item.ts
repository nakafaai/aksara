import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia menganggap turunnya jumlah pendengar sebagai alasan untuk meninggalkan studio sebelum siaran terakhir",
        },
        {
          correct: false,
          label:
            "ia membersihkan kaset yang berjamur agar keputusan penutupan dapat dibatalkan oleh pengelola",
        },
        {
          correct: true,
          label:
            "ia menerima keputusan dan meminta satu jam untuk acara perpisahan",
        },
        {
          correct: false,
          label:
            "ia menunggu telepon studio berdering sebagai syarat untuk menerima keputusan pengelola",
        },
        {
          correct: false,
          label:
            "ia memadamkan lampu mengudara lebih awal untuk menunjukkan penolakannya terhadap acara perpisahan",
        },
      ],
    },
  },
  stimulus: "last-broadcast",
};

export default item;
