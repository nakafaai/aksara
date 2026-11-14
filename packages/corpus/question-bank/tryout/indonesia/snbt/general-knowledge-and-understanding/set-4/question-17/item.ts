import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "rawa",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "tertahannya panas oleh metana di atmosfer" },
        {
          correct: true,
          label:
            "pengubahan sebagian hasil penguraian sisa tumbuhan menjadi metana oleh mikroba",
        },
        {
          correct: false,
          label: "penimbunan karbon di dalam tanah yang tergenang",
        },
        {
          correct: false,
          label: "penguraian sisa tumbuhan dalam keadaan tanpa oksigen",
        },
        {
          correct: false,
          label: "singkatnya waktu metana bertahan di atmosfer",
        },
      ],
    },
  },
};

export default item;
