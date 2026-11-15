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
            "Warsito masih menganggap nasihat itu dalih, tetapi ia menyetir pelan karena bus tuanya sudah tidak kuat melaju kencang.",
        },
        {
          correct: true,
          label:
            "Warsito kini menerima nasihat itu, dan sikapnya yang tenang malam itu ikut membuat Ardi berhenti mengejar waktu.",
        },
        {
          correct: false,
          label:
            "Warsito kini menerima nasihat itu, tetapi Ardi tetap gelisah mengejar waktu sampai bus tiba di Jakarta.",
        },
        {
          correct: false,
          label:
            "Warsito menolak nasihat itu, dan karena itu ia memacu bus agar Ardi tiba di kantor travel sebelum subuh.",
        },
        {
          correct: false,
          label:
            "Warsito kini menerima nasihat itu, karena perusahaan melarang sopir melaju di atas delapan puluh kilometer per jam.",
        },
      ],
    },
  },
};

export default item;
