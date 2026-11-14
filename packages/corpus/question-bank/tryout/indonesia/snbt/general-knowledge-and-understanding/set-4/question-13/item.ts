import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "pusaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam sistem matrilineal Minangkabau, garis keturunan mengikuti perempuan, tetapi wewenang memimpin kaum dipegang laki-laki dari garis itu, sehingga sistem ini bukan matriarkat.",
        },
        {
          correct: false,
          label:
            "Sistem matrilineal Minangkabau berbeda dari matriarkat karena harta pusaka tinggi dimiliki bersama oleh kaum, bukan oleh perempuan.",
        },
        {
          correct: false,
          label:
            "Dalam sistem matrilineal Minangkabau, perempuan mewarisi harta, sedangkan laki-laki, termasuk suami, memimpin kaum tempat mereka tinggal.",
        },
        {
          correct: false,
          label:
            "Dalam sistem matrilineal Minangkabau, kekuasaan dibagi rata karena perempuan menguasai harta dan laki-laki menguasai gelar.",
        },
        {
          correct: false,
          label:
            "Sistem matrilineal Minangkabau kerap disangka sama dengan matriarkat.",
        },
      ],
    },
  },
};

export default item;
