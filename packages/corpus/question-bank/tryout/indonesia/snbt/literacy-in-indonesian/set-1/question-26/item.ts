import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menolaknya, karena rekaman kamera hanya mencatat pertengkaran, bukan kecelakaan, sehingga datanya tidak berlaku untuk orang yang celaka.",
        },
        {
          correct: false,
          label:
            "Menolaknya, karena kecelakaan adalah keadaan yang jelas berbahaya, dan dalam keadaan seperti itu efek penonton justru makin kuat.",
        },
        {
          correct: true,
          label:
            "Menolaknya, karena peluang ada yang menolong memang dapat naik di tempat ramai, tetapi justru di sana setiap orang mudah menunggu orang lain.",
        },
        {
          correct: false,
          label:
            "Menolaknya, karena peluang ada yang menolong memang dapat naik di tempat ramai, tetapi tidak pernah melebihi peluang orang yang menolong sendirian.",
        },
        {
          correct: false,
          label:
            "Menerimanya, karena rekaman kamera menunjukkan bahwa makin banyak orang di sekitar kejadian, makin besar peluang ada yang menolong.",
        },
      ],
    },
  },
};

export default item;
