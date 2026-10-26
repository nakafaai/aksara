import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data di kumpulkan di studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan didepan studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          correct: true,
          label:
            "Data dikumpulkan di studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di studio rekaman sekolah dan kemudian membandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di studio rekaman sekolah lalu di bandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
