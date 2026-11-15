import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia tidak lagi dapat memutar engkol, karena jam pemutar lensa sudah dicabut oleh Wulan sore itu.",
        },
        {
          correct: false,
          label:
            "Ia lupa memutar engkol, karena terlalu asyik bercerita kepada Wulan tentang angin dan camar sampai larut malam.",
        },
        {
          correct: true,
          label:
            "Ia memilih melepas kebiasaan warisan ayahnya sebelum mesin memaksanya, karena jam pemutar baru dicabut besok.",
        },
        {
          correct: false,
          label:
            "Ia menyerahkan tugas memutar engkol kepada Wulan, karena Wulan sudah menguasai cara kerja lensa dan jam pemutarnya.",
        },
        {
          correct: false,
          label:
            "Ia sengaja membiarkan lensa berhenti berputar, karena ingin membuktikan bahwa lampu baru tidak dapat diandalkan.",
        },
      ],
    },
  },
};

export default item;
