import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kanal menjadi jalan bagi api untuk menyeberang ke lahan lain.",
        },
        {
          correct: true,
          label:
            "Kanal mengalirkan air keluar sehingga gambut kering dan mudah terbakar.",
        },
        {
          correct: false,
          label: "Air di dalam kanal mengandung bahan yang mudah terbakar.",
        },
        {
          correct: false,
          label: "Para penggali kanal membakar sisa tumbuhan di sekitar kanal.",
        },
        {
          correct: false,
          label:
            "Kanal membuat sisa tumbuhan di dalam lapisan gambut membusuk jauh lebih cepat daripada biasanya.",
        },
      ],
    },
  },
};

export default item;
