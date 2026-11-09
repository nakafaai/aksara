import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "rasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar peserta lebih menyukai rasa minuman baru daripada minuman lama.",
        },
        {
          correct: false,
          label:
            "Sebanyak $$70\\%$$ peserta uji lebih menyukai rasa minuman lama.",
        },
        {
          correct: true,
          label:
            "Kurang dari sepertiga peserta lebih menyukai rasa minuman lama.",
        },
        {
          correct: false,
          label:
            "Minuman dengan resep baru pasti akan lebih laku daripada minuman lama.",
        },
        {
          correct: false,
          label:
            "Peserta yang tidak dapat membedakan rasa pasti jarang minum teh kemasan.",
        },
      ],
    },
  },
};

export default item;
