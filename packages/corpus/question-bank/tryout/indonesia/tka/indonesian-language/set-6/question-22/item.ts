import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "countdown-lights",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "*Efek* berarti akibat atau pengaruh yang ditimbulkan oleh sesuatu.",
        },
        {
          correct: false,
          label:
            "*Dinas* berarti seragam yang dipakai petugas di persimpangan.",
        },
        {
          correct: true,
          label:
            "*Kamera* berarti alat perekam gambar yang dipakai untuk mencatat kecepatan kendaraan.",
        },
        {
          correct: false,
          label: "*Lampu* berarti angka yang dicat di permukaan aspal.",
        },
      ],
    },
  },
};

export default item;
