import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Darto datang demi koran Pagi Raya yang sebentar lagi berhenti terbit, dan kabar tentang anaknya menunjukkan ia ingin berhemat seperti anaknya.",
        },
        {
          correct: true,
          label:
            "Pak Darto datang untuk kebersamaan yang ia temukan di lapak, dan kabar tentang anaknya yang tidak pulang membuat janji Pak Harun untuk tetap ada makin berarti.",
        },
        {
          correct: false,
          label:
            "Pak Darto datang untuk kebersamaan yang ia temukan di lapak, dan kabar tentang anaknya menunjukkan ia marah kepada anaknya sehingga memilih menjauh dari rumah.",
        },
        {
          correct: false,
          label:
            "Pak Harun berjanji koran Pagi Raya akan tetap ada sesudah berhenti terbit, dan Pak Darto percaya karena ia jarang membaca berita.",
        },
        {
          correct: false,
          label:
            "Pak Darto datang untuk kebersamaan yang ia temukan di lapak, tetapi ia akan berhenti datang begitu Pagi Raya tidak lagi terbit.",
        },
      ],
    },
  },
};

export default item;
