import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "nutrition-and-the-human-digestive-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.6\\text{ kg}$$, and about $$16$$ weeks" },
        { correct: false, label: "$$0.6\\text{ kg}$$, and about $$4$$ weeks" },
        { correct: false, label: "$$0.6\\text{ kg}$$, and about $$7$$ weeks" },
        { correct: false, label: "$$0.6\\text{ kg}$$, and she never loses it because she still eats more than her body uses at rest" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.6\\text{ kg}$$, dan kira-kira $$16$$ minggu" },
        { correct: false, label: "$$0.6\\text{ kg}$$, dan kira-kira $$4$$ minggu" },
        { correct: false, label: "$$0.6\\text{ kg}$$, dan kira-kira $$7$$ minggu" },
        { correct: false, label: "$$0.6\\text{ kg}$$, dan dia tidak akan kehilangannya kerana dia masih makan lebih daripada keperluan badannya semasa rehat" },
      ],
    },
  },
};

export default item;
