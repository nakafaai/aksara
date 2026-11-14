import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "sachet-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Poster* berarti surat resmi yang dikirim ke rumah setiap warga.",
        },
        {
          correct: true,
          label:
            "*Saset* berarti kemasan kecil yang isinya pas untuk sekali pakai.",
        },
        {
          correct: false,
          label: "*Plastik* berarti bahan alami yang dibuat dari daun pisang.",
        },
        {
          correct: true,
          label:
            "*Aluminium* berarti logam ringan yang menjadi salah satu lapisan kemasan.",
        },
      ],
    },
  },
};

export default item;
