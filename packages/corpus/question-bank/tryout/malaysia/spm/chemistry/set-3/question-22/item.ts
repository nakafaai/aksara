import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Zinc supplies $$20$$ mol of electrons, enough to keep $$560\\text{ g}$$ of iron from forming iron(II) ions, and the same mass of magnesium supplies about $$2.7$$ times as many",
        },
        {
          correct: false,
          label:
            "Zinc supplies $$10$$ mol of electrons, enough to keep $$560\\text{ g}$$ of iron from forming iron(II) ions, and the same mass of magnesium supplies about $$2.7$$ times as many",
        },
        {
          correct: false,
          label:
            "Zinc supplies $$20$$ mol of electrons, enough to keep $$1120\\text{ g}$$ of iron from forming iron(II) ions, and the same mass of magnesium supplies the same number",
        },
        {
          correct: false,
          label:
            "Zinc supplies $$20$$ mol of electrons, enough to keep $$560\\text{ g}$$ of iron from forming iron(II) ions, and the same mass of magnesium supplies fewer, because magnesium atoms are lighter",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Zink membekalkan $$20$$ mol elektron, cukup untuk menghalang $$560\\text{ g}$$ ferum daripada membentuk ion ferum(II), dan jisim magnesium yang sama membekalkan kira-kira $$2.7$$ kali ganda",
        },
        {
          correct: false,
          label:
            "Zink membekalkan $$10$$ mol elektron, cukup untuk menghalang $$560\\text{ g}$$ ferum daripada membentuk ion ferum(II), dan jisim magnesium yang sama membekalkan kira-kira $$2.7$$ kali ganda",
        },
        {
          correct: false,
          label:
            "Zink membekalkan $$20$$ mol elektron, cukup untuk menghalang $$1120\\text{ g}$$ ferum daripada membentuk ion ferum(II), dan jisim magnesium yang sama membekalkan bilangan yang sama",
        },
        {
          correct: false,
          label:
            "Zink membekalkan $$20$$ mol elektron, cukup untuk menghalang $$560\\text{ g}$$ ferum daripada membentuk ion ferum(II), dan jisim magnesium yang sama membekalkan lebih sedikit, kerana atom magnesium lebih ringan",
        },
      ],
    },
  },
};

export default item;
