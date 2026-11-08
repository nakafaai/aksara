import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "biopori",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "lubang dilapisi beton sehingga dindingnya tidak mudah runtuh",
        },
        {
          correct: false,
          label:
            "sampah organik di dalam lubang menyerap seluruh air hujan yang turun",
        },
        {
          correct: true,
          label:
            "organisme yang memakan sampah membentuk pori-pori kecil di dinding lubang",
        },
        {
          correct: false,
          label:
            "lubang dibuat lebih lebar daripada saluran air di pinggir jalan",
        },
        {
          correct: false,
          label:
            "kompos yang terbentuk membuat tanah di sekitar lubang menjadi lebih keras",
        },
      ],
    },
  },
};

export default item;
