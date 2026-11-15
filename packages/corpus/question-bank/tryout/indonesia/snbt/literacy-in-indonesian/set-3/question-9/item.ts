import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warsito kini menerima nasihat itu, dan sikapnya membuat Ardi ikut menerimanya, sehingga di akhir perjalanan Ardi tidak lagi mempersoalkan keterlambatan.",
        },
        {
          correct: true,
          label:
            "Warsito kini menerima nasihat itu, dan sikapnya membuat Ardi berhenti melirik jam selama perjalanan, walaupun di akhir Ardi masih menilai keterlambatan dengan ukuran kantor travel.",
        },
        {
          correct: false,
          label:
            "Warsito masih menganggap nasihat itu dalih, tetapi ia menyetir pelan karena bus tuanya tidak kuat lagi, dan Ardi tetap melirik jam sampai Jakarta.",
        },
        {
          correct: false,
          label:
            "Warsito kini menerima nasihat itu, dan sikapnya membuat Ardi berhenti melirik jam, sehingga Ardi memutuskan tidak jadi bekerja di kantor travel.",
        },
        {
          correct: false,
          label:
            "Warsito kini menerima nasihat itu karena perusahaan membatasi kecepatan bus, dan Ardi tetap melirik jam sampai Jakarta.",
        },
      ],
    },
  },
};

export default item;
