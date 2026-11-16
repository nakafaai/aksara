import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dimethyl ether boils at $$78^\\circ\\text{C}$$ because its molecules are heavier, and $$0.23\\text{ g}$$ of either compound needs $$360\\text{ cm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "Ethanol boils at $$78^\\circ\\text{C}$$ because of hydrogen bonds, and $$0.23\\text{ g}$$ of ethanol needs $$360\\text{ cm}^3$$ of oxygen while the same mass of dimethyl ether needs less",
        },
        {
          correct: true,
          label:
            "Ethanol boils at $$78^\\circ\\text{C}$$ because of hydrogen bonds between its molecules, and $$0.23\\text{ g}$$ of either compound needs $$360\\text{ cm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "Ethanol boils at $$78^\\circ\\text{C}$$ because of hydrogen bonds between its molecules, and $$0.23\\text{ g}$$ of either compound needs $$120\\text{ cm}^3$$ of oxygen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dimetil eter mendidih pada $$78^\\circ\\text{C}$$ kerana molekulnya lebih berat, dan $$0.23\\text{ g}$$ mana-mana sebatian memerlukan $$360\\text{ cm}^3$$ oksigen",
        },
        {
          correct: false,
          label:
            "Etanol mendidih pada $$78^\\circ\\text{C}$$ kerana ikatan hidrogen, dan $$0.23\\text{ g}$$ etanol memerlukan $$360\\text{ cm}^3$$ oksigen manakala jisim dimetil eter yang sama memerlukan kurang",
        },
        {
          correct: true,
          label:
            "Etanol mendidih pada $$78^\\circ\\text{C}$$ kerana ikatan hidrogen antara molekulnya, dan $$0.23\\text{ g}$$ mana-mana sebatian memerlukan $$360\\text{ cm}^3$$ oksigen",
        },
        {
          correct: false,
          label:
            "Etanol mendidih pada $$78^\\circ\\text{C}$$ kerana ikatan hidrogen antara molekulnya, dan $$0.23\\text{ g}$$ mana-mana sebatian memerlukan $$120\\text{ cm}^3$$ oksigen",
        },
      ],
    },
  },
};

export default item;
