import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Regu relawan mengukur suhu gambut dengan termometer tanah pada kedalaman tiga puluh sentimeter di beberapa titik.",
        },
        {
          correct: false,
          label:
            "Api di lahan gambut dapat menyala lagi beberapa hari setelah permukaannya tampak padam.",
        },
        {
          correct: false,
          label:
            "Kebiasaan regu relawan itu berlebihan karena api di permukaan lahan sudah padam.",
        },
        {
          correct: true,
          label:
            "Regu relawan baru meninggalkan lahan yang terbakar setelah memastikan, dengan membasahi dan mengukur suhu gambut, bahwa api di dalam gambut benar-benar padam.",
        },
        {
          correct: false,
          label:
            "Regu relawan menyemprotkan air ke dalam gambut sampai lapisan bawahnya basah.",
        },
      ],
    },
  },
};

export default item;
