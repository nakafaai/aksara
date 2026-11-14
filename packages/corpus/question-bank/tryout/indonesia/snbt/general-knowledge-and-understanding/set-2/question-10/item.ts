import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "antibiotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "*keduanya* pada kalimat (2) merujuk pada bakteri dan virus",
        },
        {
          correct: false,
          label:
            "*aturan itu* pada kalimat (4) merujuk pada pengawasan yang longgar",
        },
        {
          correct: false,
          label:
            "*Sifat itu* pada kalimat (6) merujuk pada kemampuan obat untuk menghambat bakteri",
        },
        {
          correct: false,
          label:
            "*Hal itu* pada kalimat (16) merujuk pada pencarian obat baru dan upaya menjaga keampuhan antibiotik",
        },
        {
          correct: true,
          label:
            "*sel-sel itu* pada kalimat (8) merujuk pada sebagian kecil sel yang membawa perubahan genetik",
        },
      ],
    },
  },
};

export default item;
