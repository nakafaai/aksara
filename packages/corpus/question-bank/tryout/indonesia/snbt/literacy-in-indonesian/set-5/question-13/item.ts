import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "mountain-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sebagian besar pendaki perorangan sebenarnya lebih suka mendaki pada hari kerja",
        },
        {
          correct: false,
          label:
            "porter desa lebih terampil daripada porter yang dibawa operator dari kota",
        },
        {
          correct: false,
          label:
            "pengelola taman nasional bersedia menaikkan kuota harian di atas $$400$$ orang",
        },
        {
          correct: false,
          label:
            "pendapatan porter desa sebelum kuota berlaku sudah mencukupi kebutuhan mereka",
        },
        {
          correct: true,
          label:
            "operator perjalanan tidak dapat dengan mudah mengakali batas itu dengan memesan lewat banyak nama",
        },
      ],
    },
  },
};

export default item;
