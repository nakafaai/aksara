import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "lichen-air",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lumut kerak membutuhkan lebih banyak cahaya matahari daripada pohon untuk bertahan hidup.",
        },
        {
          correct: false,
          label:
            "Jamur dalam lumut kerak tidak dapat menahan air hujan sehingga zat pencemar mudah masuk.",
        },
        {
          correct: true,
          label:
            "Lumut kerak menyerap zat langsung lewat seluruh permukaan tubuh dan tidak dapat menggugurkan daun.",
        },
        {
          correct: false,
          label:
            "Lumut kerak hanya dapat tumbuh di batang pohon yang kulit kayunya asam dan lembap.",
        },
        {
          correct: false,
          label:
            "Ganggang dalam lumut kerak berhenti berfotosintesis ketika udara mengandung nitrogen.",
        },
      ],
    },
  },
};

export default item;
