import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "lost-cat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bu Wening menuduh Nayla menyembunyikan Puspa",
        },
        {
          correct: false,
          label: "Bu Wening ingin pindah ke tempat yang lebih tenang",
        },
        {
          correct: true,
          label:
            "Bu Wening memahami bahwa Puspa pergi untuk melahirkan dan merawat anak-anaknya",
        },
        {
          correct: false,
          label: "Bu Wening kesal karena rumahnya terlalu ramai",
        },
        { correct: false, label: "Bu Wening akan mengusir Puspa dari rumah" },
      ],
    },
  },
};

export default item;
