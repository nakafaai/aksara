import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Luas, terang, dan terbuka langsung ke jalan", value: false },
    {
      label: "Sempit, lembap, dan seluruh dindingnya terbuat dari besi",
      value: false,
    },
    {
      label: "Sempit, tanpa pandangan ke luar, dan berjendela kecil berjeruji",
      value: true,
    },
    {
      label: "Mewah, berhias lukisan, dan memiliki banyak pintu",
      value: false,
    },
    {
      label: "Berada di bawah tanah dan hanya dapat dicapai melalui tangga",
      value: false,
    },
  ],
};

export default choices;
