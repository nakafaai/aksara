import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$225\\text{ km}$$, no sky wave reaches R and $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$225\\text{ km}$$, the sky wave arrives $$1.33\\text{ ms}$$ after the ground wave and $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$450\\text{ km}$$, no sky wave reaches R and $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$225\\text{ km}$$, no sky wave reaches R and $$336\\text{ km}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$225\\text{ km}$$, tiada gelombang langit sampai ke R dan $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$225\\text{ km}$$, gelombang langit tiba $$1.33\\text{ ms}$$ selepas gelombang bumi dan $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$450\\text{ km}$$, tiada gelombang langit sampai ke R dan $$671\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "$$225\\text{ km}$$, tiada gelombang langit sampai ke R dan $$336\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
