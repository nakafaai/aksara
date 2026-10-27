import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "rain-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "agar tingkat keparahan genangan dapat dibandingkan selain durasinya",
        },
        {
          correct: false,
          label: "agar air tidak pernah masuk ke taman",
        },
        {
          correct: false,
          label:
            "agar perubahan durasi genangan dapat dikaitkan dengan taman tanpa memeriksa kondisi selokan",
        },
        {
          correct: false,
          label:
            "agar pengukuran genangan dapat dibandingkan tanpa menyesuaikan perbedaan intensitas hujan",
        },
        {
          correct: false,
          label: "agar tanaman dapat dipindahkan ke gerbang",
        },
      ],
    },
  },
};

export default item;
