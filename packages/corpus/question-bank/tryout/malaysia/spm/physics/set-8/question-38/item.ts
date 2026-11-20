import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "neptunium-237 with $$93$$ protons, $$18.5\\text{ kBq}$$, and alpha particles ionise air strongly but are stopped within a few centimetres",
        },
        {
          correct: true,
          label:
            "neptunium-237 with $$93$$ protons, $$9.3\\text{ kBq}$$, and alpha particles ionise air strongly but are stopped within a few centimetres",
        },
        {
          correct: false,
          label:
            "neptunium-237 with $$93$$ protons, $$9.3\\text{ kBq}$$, and alpha particles pass easily through smoke",
        },
        {
          correct: false,
          label:
            "americium-237 with $$95$$ protons, $$9.3\\text{ kBq}$$, and alpha particles ionise air strongly but are stopped within a few centimetres",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "neptunium-237 dengan $$93$$ proton, $$18.5\\text{ kBq}$$, dan zarah alfa mengion udara dengan kuat tetapi dihentikan dalam beberapa sentimeter",
        },
        {
          correct: true,
          label:
            "neptunium-237 dengan $$93$$ proton, $$9.3\\text{ kBq}$$, dan zarah alfa mengion udara dengan kuat tetapi dihentikan dalam beberapa sentimeter",
        },
        {
          correct: false,
          label:
            "neptunium-237 dengan $$93$$ proton, $$9.3\\text{ kBq}$$, dan zarah alfa mudah menembusi asap",
        },
        {
          correct: false,
          label:
            "amerisium-237 dengan $$95$$ proton, $$9.3\\text{ kBq}$$, dan zarah alfa mengion udara dengan kuat tetapi dihentikan dalam beberapa sentimeter",
        },
      ],
    },
  },
};

export default item;
