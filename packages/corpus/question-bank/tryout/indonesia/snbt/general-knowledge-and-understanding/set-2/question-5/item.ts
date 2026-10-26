import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kelelawar yang bergantung dapat melepaskan cengkeraman dan menjatuhkan diri ke ruang terbuka untuk mulai terbang.",
        },
        {
          correct: false,
          label: "Tidak ada kelelawar yang dapat lepas landas dari tanah.",
        },
        {
          correct: false,
          label:
            "Kelelawar harus terus memakai tenaga otot agar cakarnya mencengkeram tempat bertengger.",
        },
        {
          correct: false,
          label:
            "Setiap spesies kelelawar memiliki cara bertengger dan lepas landas yang sama persis.",
        },
        {
          correct: false,
          label:
            "Posisi bertengger terbalik menjamin bahwa tidak ada predator yang dapat menjangkau kelelawar.",
        },
      ],
    },
  },
};

export default item;
