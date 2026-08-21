import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "erhöht den Blutdruck",
      value: true,
    },
    {
      label: "senkt den Blutdruck",
      value: false,
    },
    {
      label: "beugt Herz-Kreislauf-Erkrankungen vor",
      value: false,
    },
    {
      label: "beschleunigt die Verdauung",
      value: false,
    },
    {
      label: "beseitigt den Kaliumbedarf des Körpers",
      value: false,
    },
  ],
  en: [
    {
      label: "raises blood pressure",
      value: true,
    },
    {
      label: "lowers blood pressure",
      value: false,
    },
    {
      label: "prevents cardiovascular disease",
      value: false,
    },
    {
      label: "accelerates digestion",
      value: false,
    },
    {
      label: "removes the body's need for potassium",
      value: false,
    },
  ],
  id: [
    {
      label: "meningkatkan tekanan darah",
      value: true,
    },
    {
      label: "menurunkan tekanan darah",
      value: false,
    },
    {
      label: "mencegah penyakit kardiovaskular",
      value: false,
    },
    {
      label: "mempercepat pencernaan",
      value: false,
    },
    {
      label: "menghilangkan kebutuhan tubuh akan kalium",
      value: false,
    },
  ],
};

export default choices;
