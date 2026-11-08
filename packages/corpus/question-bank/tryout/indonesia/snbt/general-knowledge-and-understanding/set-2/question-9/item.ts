import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Agar bambu dapat tumbuh menjadi hutan baru di tepi pantai.",
        },
        {
          correct: false,
          label: "Agar tambak di belakangnya dapat diperluas ke arah laut.",
        },
        {
          correct: true,
          label:
            "Agar lumpur mengendap lebih dulu sehingga bibit mangrove dapat tumbuh baik.",
        },
        {
          correct: false,
          label:
            "Agar nelayan dapat menambatkan perahu di dekat bibit mangrove.",
        },
        {
          correct: false,
          label:
            "Agar gelombang dipantulkan kembali ke tengah laut untuk selamanya.",
        },
      ],
    },
  },
};

export default item;
