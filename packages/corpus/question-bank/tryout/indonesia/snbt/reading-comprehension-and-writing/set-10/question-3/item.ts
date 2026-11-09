import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "net-recycling",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Para nelayan mendiskusikan mengenai cara mengumpulkan jaring dalam pertemuan bulanan koperasi.",
        },
        {
          correct: false,
          label:
            "Para nelayan berdiskusi cara mengumpulkan jaring dalam pertemuan bulanan koperasi.",
        },
        {
          correct: true,
          label:
            "Para nelayan mendiskusikan cara mengumpulkan jaring dalam pertemuan bulanan koperasi.",
        },
        {
          correct: false,
          label:
            "Para nelayan-nelayan mendiskusikan cara mengumpulkan jaring dalam pertemuan bulanan koperasi.",
        },
        {
          correct: false,
          label:
            "Para nelayan mendiskusikan tentang cara mengumpulkan jaring-jaring dalam pertemuan bulanan koperasi.",
        },
      ],
    },
  },
};

export default item;
