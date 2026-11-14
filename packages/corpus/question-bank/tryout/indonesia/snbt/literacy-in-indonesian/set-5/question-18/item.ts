import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "evidence",
  },
  stimulus: "river-quality",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "banyak rumah yang direncanakan dibangun di kawasan perumahan itu pada tahun-tahun mendatang",
        },
        {
          correct: false,
          label: "BOD dan DO di T5 pada puncak musim hujan 2024",
        },
        {
          correct: false,
          label: "BOD air limbah sentra tahu sesudah melewati IPAL",
        },
        {
          correct: false,
          label: "luas hamparan sawah di antara T4 dan T5 pada 2024",
        },
        {
          correct: true,
          label:
            "BOD air sungai tepat di hulu dan tepat di hilir saluran buangan perumahan itu pada hari yang sama",
        },
      ],
    },
  },
};

export default item;
