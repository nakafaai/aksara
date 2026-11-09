import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "larva-compost",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lalat tentara hitam pertama kali ditemukan di benua Amerika.",
        },
        {
          correct: true,
          label:
            "Selain mengurangi sampah, usaha itu juga memberi penghasilan bagi kelompok pemuda tersebut.",
        },
        {
          correct: false,
          label: "Sampah plastik di pasar juga harus dipilah sebelum dibuang.",
        },
        {
          correct: false,
          label: "Oleh karena itu, Pasar Sentul akan ditutup untuk sementara.",
        },
        {
          correct: false,
          label:
            "Namun, pengelola pasar tidak pernah memikirkan masalah sampah.",
        },
      ],
    },
  },
};

export default item;
