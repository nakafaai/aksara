import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "child-helmets",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "kantor pemerintah yang mengurus jalan raya" },
        {
          correct: false,
          label: "sekolah dasar yang diamati pada bulan Februari",
        },
        {
          correct: true,
          label:
            "kelompok orang yang berkumpul karena tujuan atau minat yang sama",
        },
        {
          correct: false,
          label: "perusahaan yang membuat helm untuk anak-anak",
        },
        { correct: false, label: "rapat orang tua murid di sekolah" },
      ],
    },
  },
};

export default item;
