import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menjelaskan aturan pertandingan Piala Thomas yang memungkinkan negara baru seperti Indonesia menang",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa para pemain Indonesia lebih kaya daripada pemain Malaya",
        },
        {
          correct: true,
          label:
            "mengoreksi cerita kemenangan karena semangat saja dengan menunjukkan dasar yang sudah dibangun sebelumnya",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa klub-klub bulu tangkis jauh lebih penting daripada semangat para pemain yang berangkat ke Singapura",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa PBSI baru berdiri pada 1951, jauh sesudah klub-klub bulu tangkis",
        },
      ],
    },
  },
};

export default item;
