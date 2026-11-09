import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "sign-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mereka belajar tiga hal dasar, mengeja abjad dengan jari, memperkenalkan diri, dan menanyakan arah.",
        },
        {
          correct: false,
          label:
            "Mereka belajar tiga hal dasar: mengeja abjad dengan jari memperkenalkan diri dan menanyakan arah.",
        },
        {
          correct: false,
          label:
            "Mereka belajar: tiga hal dasar, mengeja abjad dengan jari, memperkenalkan diri, dan menanyakan arah.",
        },
        {
          correct: true,
          label:
            "Mereka belajar tiga hal dasar: mengeja abjad dengan jari, memperkenalkan diri, dan menanyakan arah.",
        },
        {
          correct: false,
          label:
            "Mereka belajar tiga hal dasar: mengeja abjad dengan jari, memperkenalkan diri dan, menanyakan arah.",
        },
      ],
    },
  },
};

export default item;
