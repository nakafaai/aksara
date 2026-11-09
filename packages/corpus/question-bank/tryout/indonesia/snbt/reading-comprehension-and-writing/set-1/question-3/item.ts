import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "village-radio",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyiarnya adalah para pemuda-pemuda desa yang belajar mengoperasikan pemancar dengan cara otodidak.",
        },
        {
          correct: false,
          label:
            "Penyiar-penyiarnya adalah para pemuda desa yang belajar mengoperasikan pemancar secara otodidak.",
        },
        {
          correct: true,
          label:
            "Penyiarnya adalah para pemuda desa yang belajar mengoperasikan pemancar secara otodidak.",
        },
        {
          correct: false,
          label:
            "Penyiarnya adalah pemuda-pemuda desa-desa yang belajar mengoperasikan pemancar secara otodidak.",
        },
        {
          correct: false,
          label:
            "Penyiarnya adalah para pemuda desa yang mana belajar mengoperasikan pemancar secara otodidak.",
        },
      ],
    },
  },
};

export default item;
