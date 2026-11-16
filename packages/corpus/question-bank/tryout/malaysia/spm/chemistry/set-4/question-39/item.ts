import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Atom economy $$100\\%$$, percentage yield $$80\\%$$, and hydration needs $$224\\text{ kg}$$ of ethene",
        },
        {
          correct: false,
          label:
            "Atom economy $$51\\%$$, percentage yield $$41\\%$$, and hydration needs $$224\\text{ kg}$$ of ethene",
        },
        {
          correct: false,
          label:
            "Atom economy $$51\\%$$, percentage yield $$80\\%$$, and hydration needs $$448\\text{ kg}$$ of ethene",
        },
        {
          correct: true,
          label:
            "Atom economy $$51\\%$$, percentage yield $$80\\%$$, and hydration needs $$224\\text{ kg}$$ of ethene",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ekonomi atom $$100\\%$$, peratus hasil $$80\\%$$, dan penghidratan memerlukan $$224\\text{ kg}$$ etena",
        },
        {
          correct: false,
          label:
            "Ekonomi atom $$51\\%$$, peratus hasil $$41\\%$$, dan penghidratan memerlukan $$224\\text{ kg}$$ etena",
        },
        {
          correct: false,
          label:
            "Ekonomi atom $$51\\%$$, peratus hasil $$80\\%$$, dan penghidratan memerlukan $$448\\text{ kg}$$ etena",
        },
        {
          correct: true,
          label:
            "Ekonomi atom $$51\\%$$, peratus hasil $$80\\%$$, dan penghidratan memerlukan $$224\\text{ kg}$$ etena",
        },
      ],
    },
  },
};

export default item;
