import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "noken",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Noken dapat dibuat dari serat tumbuhan yang dipintal menjadi benang.",
        },
        {
          column: 2,
          label: "Beban di dalam noken terutama bertumpu pada bahu pemakainya.",
        },
        {
          column: 2,
          label:
            "Penetapan oleh UNESCO menunjukkan bahwa noken sudah aman dari ancaman kepunahan.",
        },
        {
          column: 1,
          label:
            "Makin banyaknya pemakaian tas plastik yang murah menjadi salah satu ancaman bagi keberlanjutan noken.",
        },
      ],
    },
  },
};

export default item;
