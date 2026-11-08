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
            "Lumut kerak membutuhkan lebih banyak cahaya matahari daripada pohon.",
        },
        {
          correct: false,
          label: "Jamur dalam lumut kerak tidak dapat menahan air hujan.",
        },
        {
          correct: true,
          label:
            "Lumut kerak menyerap zat dari udara dan hujan langsung melalui seluruh permukaan tubuhnya tanpa lapisan pelindung dan tidak dapat membuang zat pencemar dengan menggugurkan daun.",
        },
        {
          correct: false,
          label:
            "Lumut kerak hanya dapat tumbuh di batang pohon yang kulit kayunya asam.",
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
