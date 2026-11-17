import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "By $$31\\text{ kPa}$$, then about $$3\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "By $$21\\text{ kPa}$$, then no blood reaches the brain",
        },
        {
          correct: false,
          label: "No reduction, then about $$10\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "By $$41\\text{ kPa}$$, then about $$8\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebanyak $$31\\text{ kPa}$$, kemudian kira-kira $$3\\text{ kPa}$$",
        },
        {
          correct: false,
          label:
            "Sebanyak $$21\\text{ kPa}$$, kemudian tiada darah sampai ke otak",
        },
        {
          correct: false,
          label: "Tiada pengurangan, kemudian kira-kira $$10\\text{ kPa}$$",
        },
        {
          correct: false,
          label:
            "Sebanyak $$41\\text{ kPa}$$, kemudian kira-kira $$8\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
