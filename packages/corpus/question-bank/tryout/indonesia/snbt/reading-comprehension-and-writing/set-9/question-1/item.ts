import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "fire-volunteers",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kebakaran di Indonesia",
        },
        {
          correct: false,
          label: "Kompor yang Terbakar",
        },
        {
          correct: false,
          label: "Mobil Pemadam Kebakaran",
        },
        {
          correct: true,
          label: "Regu Relawan Pemadam Menjaga Kampung dengan Gang Sempit",
        },
        {
          correct: false,
          label: "Papan Pengumuman Balai RW",
        },
      ],
    },
  },
};

export default item;
