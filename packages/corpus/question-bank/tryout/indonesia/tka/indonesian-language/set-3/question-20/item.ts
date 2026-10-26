import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ia mula-mula menambah not pada birama kosong.",
        },
        {
          correct: true,
          label: "Ia menahan diri agar Ayu menemukan tempo.",
        },
        {
          correct: false,
          label:
            "Ia masih mengisi ruang melodi Ayu ketika merasa bagian klarinet terlalu singkat.",
        },
        {
          correct: true,
          label: "Ia menulis kata ‘dengarkan’ pada partitur.",
        },
      ],
    },
  },
  stimulus: "empty-measure",
};

export default item;
