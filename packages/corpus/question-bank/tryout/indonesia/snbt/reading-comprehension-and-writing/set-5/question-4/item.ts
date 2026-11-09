import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "indigo-batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pewarnaan dengan pasta daun tom sangat memerlukan waktu yang lama sekali.",
        },
        {
          correct: true,
          label:
            "Pewarnaan dengan pasta daun tom memerlukan waktu yang sangat lama.",
        },
        {
          correct: false,
          label:
            "Pewarnaan dengan pasta daun tom memerlukan waktu yang amat sangat lama.",
        },
        {
          correct: false,
          label:
            "Pewarnaan dengan pasta daun tom, memerlukan waktu yang lama sekali.",
        },
        {
          correct: false,
          label:
            "Pewarnaan yang dengan pasta daun tom memerlukan waktu sangat lama.",
        },
      ],
    },
  },
};

export default item;
