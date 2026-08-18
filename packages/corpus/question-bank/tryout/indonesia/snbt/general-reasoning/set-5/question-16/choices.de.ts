import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Wachstum lag in jedem genannten Jahr über $$5%$$",
      value: true,
    },
    {
      label: "Ab $$2016$$ verbesserte sich das Wirtschaftswachstum wieder",
      value: false,
    },
    {
      label:
        "Das BIP betrug $$2018$$ $$\\text{Rp }14{.}837{,}4\\text{ Billionen}$$ und das BIP pro Kopf rund $$\\text{Rp }56\\text{ Millionen}$$",
      value: false,
    },
    {
      label:
        "Das niedrigste genannte Wachstum betrug $$4{,}88%$$ im Jahr $$2015$$",
      value: false,
    },
    {
      label: "Das Wirtschaftswachstum betrug $$2018$$ $$5{,}17%$$",
      value: false,
    },
  ],
};

export default choices;
