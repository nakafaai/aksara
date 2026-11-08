import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "salt-house",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petambak garam di Desa Tanjung Sari hanya dapat memanen garam pada musim kemarau.",
        },
        {
          correct: false,
          label:
            "Garam yang dibuat di petak tanah bercampur lumpur dan berwarna kusam.",
        },
        {
          correct: true,
          label:
            "Cara petambak di Desa Tanjung Sari membuat garam berubah dari petak tanah terbuka ke rumah prisma.",
        },
        {
          correct: false,
          label:
            "Atap plastik bening meneruskan cahaya matahari ke dalam rumah prisma.",
        },
        {
          correct: false,
          label:
            "Rumah prisma membuat hasil panen garam naik hampir dua kali lipat.",
        },
      ],
    },
  },
};

export default item;
