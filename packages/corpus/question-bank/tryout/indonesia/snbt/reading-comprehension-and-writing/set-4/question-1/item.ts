import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Garis pantai Desa Pasir Putih mundur hampir dua meter setiap tahun.",
        },
        {
          correct: true,
          label:
            "Kelompok nelayan Desa Pasir Putih menahan abrasi dengan membibitkan dan menanam bakau.",
        },
        {
          correct: false,
          label:
            "Buah bakau yang jatuh di muara dapat disemai di dalam kantong plastik.",
        },
        {
          correct: false,
          label: "Pagar bambu melindungi bibit bakau dari ombak.",
        },
        {
          correct: false,
          label:
            "Akar bakau menjadi tempat kepiting dan ikan kecil berkembang biak.",
        },
      ],
    },
  },
};

export default item;
