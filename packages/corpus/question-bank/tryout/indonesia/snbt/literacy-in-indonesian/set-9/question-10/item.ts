import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "old-translator",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ia mengetahui kesulitan kecil suaminya sehari-hari walaupun suaminya jarang bercerita.",
        },
        {
          correct: false,
          label: "Ia kecewa karena suaminya tidak pernah menjadi orang sukses.",
        },
        {
          correct: true,
          label:
            "Ia pernah menanggung beban keluarga tanpa memberi tahu suaminya.",
        },
        {
          correct: false,
          label:
            "Ia menulis surat-surat itu kepada suaminya ketika suaminya bekerja jauh.",
        },
        {
          correct: false,
          label:
            "Ia berharap cucunya kelak menjadi penerjemah seperti kakeknya.",
        },
      ],
    },
  },
};

export default item;
