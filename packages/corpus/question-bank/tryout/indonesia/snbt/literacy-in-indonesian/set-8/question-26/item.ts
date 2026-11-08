import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "bandung-conference",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menegaskan bahwa gagasan konferensi lebih penting daripada tempatnya",
        },
        {
          correct: false,
          label:
            "mengkritik pemerintah yang mengubah gedung itu menjadi museum",
        },
        {
          correct: false,
          label: "menyarankan agar Museum Konferensi Asia Afrika ditutup saja",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa gedung itu sebenarnya tidak pernah dipakai untuk konferensi",
        },
        {
          correct: false,
          label: "menunjukkan bahwa museum itu mungkin jarang dikunjungi orang",
        },
      ],
    },
  },
};

export default item;
