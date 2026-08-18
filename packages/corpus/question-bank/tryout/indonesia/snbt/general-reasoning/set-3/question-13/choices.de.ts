import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Geschäft verkauft $$24$$ Bergo-Tücher.",
      value: false,
    },
    {
      label:
        "Pashmina ist mit $$35$$ verkauften Tüchern das meistverkaufte Modell.",
      value: false,
    },
    {
      label: "Das Geschäft verkauft $$42$$ quadratische Tücher.",
      value: true,
    },
    {
      label: "Es werden weniger Pashmina- als Bergo-Tücher verkauft.",
      value: false,
    },
    {
      label: "Bergo ist das meistverkaufte Kopftuchmodell.",
      value: false,
    },
  ],
};

export default choices;
