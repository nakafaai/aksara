import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "The species is native only to Papua", value: false },
    {
      label: "The species is introduced everywhere outside New Guinea",
      value: false,
    },
    {
      label: "The species grows primarily in a dry temperate biome",
      value: false,
    },
    {
      label: "The species' native range extends well beyond New Guinea",
      value: true,
    },
    { label: "The species is an herb rather than a tree", value: false },
  ],
  id: [
    { label: "Spesies ini hanya berasal dari Papua", value: false },
    {
      label:
        "Spesies ini merupakan tumbuhan introduksi di semua wilayah di luar Pulau Papua",
      value: false,
    },
    {
      label: "Spesies ini terutama hidup di bioma kering beriklim sedang",
      value: false,
    },
    {
      label: "Daerah asal spesies ini membentang jauh melampaui Pulau Papua",
      value: true,
    },
    { label: "Spesies ini merupakan herba, bukan pohon", value: false },
  ],
};

export default choices;
