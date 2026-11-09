import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "petir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "lebih sering menyambar benda tinggi, walaupun tidak selalu",
        },
        {
          correct: false,
          label:
            "selalu menyambar benda yang paling tinggi di setiap tempat yang dilaluinya",
        },
        {
          correct: false,
          label: "tidak pernah menyambar benda yang letaknya rendah",
        },
        {
          correct: false,
          label: "hanya menyambar pohon yang berdiri sendiri",
        },
        {
          correct: false,
          label: "menyambar benda tinggi hanya ketika hujan turun",
        },
      ],
    },
  },
};

export default item;
