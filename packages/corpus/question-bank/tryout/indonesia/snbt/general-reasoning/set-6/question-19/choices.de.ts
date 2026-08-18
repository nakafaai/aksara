import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "In den vier Zeilen geht eine höhere Rohreisproduktion jeweils mit geringeren Reisimporten einher.",
      value: false,
    },
    {
      label:
        "Sowohl die höchsten Reisimporte als auch die höchste Reisbeschaffung treten 1999 auf.",
      value: false,
    },
    {
      label:
        "Die höchste Reisproduktion und die höchste Reisbeschaffung treten im selben Jahr auf.",
      value: true,
    },
    {
      label:
        "Die höchste Reisproduktion steht in derselben Zeile wie die niedrigste Reisbeschaffung.",
      value: false,
    },
    {
      label:
        "Sowohl die niedrigsten Reisimporte als auch die niedrigste Reisbeschaffung treten 2004 auf.",
      value: false,
    },
  ],
};

export default choices;
