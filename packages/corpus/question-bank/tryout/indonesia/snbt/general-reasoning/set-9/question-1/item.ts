import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "ulat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Perangkap feromon kemungkinan ikut menurunkan ulat, tetapi tidak menjelaskan seluruh penurunannya.",
        },
        {
          correct: false,
          label:
            "Perangkap feromon menurunkan banyak ulat sebesar $$60\\%$$ di petak yang dipasangi perangkap selama bulan itu.",
        },
        {
          correct: false,
          label:
            "Hujan adalah satu-satunya penyebab turunnya ulat di kedua kelompok petak.",
        },
        {
          correct: false,
          label:
            "Tanpa perangkap, banyak ulat di petak bawang merah akan terus bertambah.",
        },
        {
          correct: false,
          label:
            "Perangkap feromon membuat hasil panen bawang merah naik sebesar $$60\\%$$.",
        },
      ],
    },
  },
};

export default item;
