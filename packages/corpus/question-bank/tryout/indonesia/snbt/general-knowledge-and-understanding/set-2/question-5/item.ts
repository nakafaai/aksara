import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Kelelawar yang bergantung dapat melepaskan cengkeraman dan menjatuhkan diri ke ruang terbuka untuk mulai terbang.",
        },
        {
          isCorrect: false,
          label: "Tidak ada kelelawar yang dapat lepas landas dari tanah.",
        },
        {
          isCorrect: false,
          label:
            "Kelelawar harus terus memakai tenaga otot agar cakarnya mencengkeram tempat bertengger.",
        },
        {
          isCorrect: false,
          label:
            "Setiap spesies kelelawar memiliki cara bertengger dan lepas landas yang sama persis.",
        },
        {
          isCorrect: false,
          label:
            "Posisi bertengger terbalik menjamin bahwa tidak ada predator yang dapat menjangkau kelelawar.",
        },
      ],
    },
  },
};

export default item;
