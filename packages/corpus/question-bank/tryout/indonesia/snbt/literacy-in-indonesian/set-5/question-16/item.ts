import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "river-quality",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah IPAL beroperasi, air sungai di T3 sudah memenuhi baku mutu air kelas dua.",
        },
        {
          correct: false,
          label:
            "Pada 2024, titik pantau yang memenuhi kedua syarat baku mutu lebih banyak daripada pada 2021.",
        },
        {
          correct: true,
          label:
            "BOD di T3 turun lebih dari separuhnya, tetapi titik itu baru memenuhi satu dari dua syarat baku mutu air kelas dua.",
        },
        {
          correct: false,
          label:
            "Naiknya BOD di T2 menunjukkan bahwa IPAL sentra tahu belum bekerja sebagaimana mestinya.",
        },
        {
          correct: false,
          label:
            "IPAL memperbaiki mutu air di semua titik pantau yang terletak di hilir sentra tahu.",
        },
      ],
    },
  },
};

export default item;
