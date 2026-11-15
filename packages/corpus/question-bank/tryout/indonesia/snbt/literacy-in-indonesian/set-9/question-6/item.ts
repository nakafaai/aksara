import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "word-meaning",
  },
  stimulus: "old-translator",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalam kedua pilihan, Pak Sastro memilih kata yang lebih sopan agar terjemahannya tidak menyinggung cucunya.",
        },
        {
          correct: false,
          label:
            "Dalam kedua pilihan, Pak Sastro mengikuti usul Dita agar terjemahannya mudah dipahami.",
        },
        {
          correct: true,
          label:
            "Dalam kedua pilihan, Pak Sastro menolak kata yang ringkas dan umum demi frasa yang menyimpan cara Bu Ratmi memandang suaminya, yaitu keluhan yang sabar dan kesulitan kecil yang ia ketahui.",
        },
        {
          correct: false,
          label:
            "Dalam kedua pilihan, Pak Sastro memilih kata yang menggambarkan sifat, bukan kejadian atau kebiasaan.",
        },
        {
          correct: false,
          label:
            "Dalam pilihan pertama ia mengutamakan kesetiaan, tetapi dalam pilihan kedua ia mengutamakan kenangan pribadinya, jadi keduanya tidak sejalan.",
        },
      ],
    },
  },
};

export default item;
