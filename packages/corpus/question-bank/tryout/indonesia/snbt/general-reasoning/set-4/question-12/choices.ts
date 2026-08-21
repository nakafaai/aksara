import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Art ist nur in Papua heimisch", value: false },
    {
      label: "Die Art ist überall außerhalb Neuguineas eingeführt",
      value: false,
    },
    {
      label: "Die Art wächst vor allem in einem trockenen gemäßigten Biom",
      value: false,
    },
    {
      label:
        "Das natürliche Verbreitungsgebiet der Art reicht weit über Neuguinea hinaus",
      value: true,
    },
    { label: "Die Art ist eine krautige Pflanze und kein Baum", value: false },
  ],
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
