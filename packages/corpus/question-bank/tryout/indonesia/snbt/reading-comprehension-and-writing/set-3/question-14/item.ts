import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Curah hujan dan derasnya arus sungai pada musim hujan tahun ini sama dengan tahun-tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Pada tahun yang sama, sekolah mulai menyediakan bus antarjemput bagi murid dari Kampung Lebak Muncang.",
        },
        {
          correct: false,
          label:
            "Jembatan gantung itu dicat dengan warna cerah agar mudah terlihat dari jauh.",
        },
        {
          correct: false,
          label:
            "Insinyur yang membantu warga pernah membangun jembatan di daerah lain.",
        },
        {
          correct: false,
          label:
            "Jumlah murid dari kampung lain yang tidak masuk sekolah pada musim hujan juga turun tajam tahun ini.",
        },
      ],
    },
  },
};

export default item;
