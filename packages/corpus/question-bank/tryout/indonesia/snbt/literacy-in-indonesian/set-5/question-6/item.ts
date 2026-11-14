import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "ferry-mechanic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Surat itu memberitahukan bahwa masa kerja Pak Wiryo berakhir empat hari lagi, dan ia belum mau menerima kenyataan itu.",
        },
        {
          correct: false,
          label:
            "Surat itu menegur Pak Wiryo karena ia tidak pernah mencatat data mesin seperti yang dilakukan Darto.",
        },
        {
          correct: false,
          label:
            "Surat itu memindahkan Pak Wiryo ke kapal lain sehingga urusan suku cadang diserahkan kepada orang lain.",
        },
        {
          correct: false,
          label:
            "Surat itu berisi penghargaan atas masa baktinya, dan ia membawanya ke mana-mana karena bangga.",
        },
        {
          correct: false,
          label:
            "Surat itu mengundang Pak Wiryo ke acara kantor pekan depan, dan ia belum memutuskan untuk datang.",
        },
      ],
    },
  },
};

export default item;
