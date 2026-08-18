import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "how bats search for food at night.",
      value: false,
    },
    {
      label: "how dropping from a perch helps a bat take flight.",
      value: false,
    },
    {
      label: "the advantages of upside-down roosting for bats.",
      value: true,
    },
    {
      label: "the places where bats rest during the day.",
      value: false,
    },
    {
      label: "how high roosts may help bats avoid predators.",
      value: false,
    },
  ],
  id: [
    {
      label: "cara kelelawar mencari makan pada malam hari.",
      value: false,
    },
    {
      label:
        "cara menjatuhkan diri dari tempat bertengger membantu kelelawar terbang.",
      value: false,
    },
    {
      label: "keuntungan bertengger terbalik bagi kelelawar.",
      value: true,
    },
    {
      label: "tempat kelelawar beristirahat pada siang hari.",
      value: false,
    },
    {
      label:
        "cara tempat bertengger yang tinggi dapat melindungi kelelawar dari predator.",
      value: false,
    },
  ],
};

export default choices;
