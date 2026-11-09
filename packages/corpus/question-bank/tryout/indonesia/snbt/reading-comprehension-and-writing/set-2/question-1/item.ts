import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "weaving-class",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "agar kain hasil kelas dapat dijual kepada pengunjung balai desa",
        },
        {
          correct: true,
          label: "agar kain ikat tetap hidup di tangan generasi muda",
        },
        {
          correct: false,
          label: "agar remaja desa dapat memintal benang lebih cepat",
        },
        {
          correct: false,
          label: "agar pewarna alami menggantikan pewarna buatan di pasar",
        },
        {
          correct: false,
          label: "agar sanggar tenun mendapat penenun baru untuk pameran",
        },
      ],
    },
  },
};

export default item;
