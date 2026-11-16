import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The percentage of carbon in the alkenes rises as the chain gets longer" },
        { correct: false, label: "The percentage of carbon in the alkanes falls as the chain gets longer" },
        { correct: true, label: "Every alkene has 85.7% carbon by mass because its general formula is $$\\text{C}_n\\text{H}_{2n}$$, so an alkene burns with a sootier flame than the alkane with the same number of carbon atoms" },
        { correct: false, label: "Methane has the highest percentage of carbon of all the alkanes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Peratus karbon dalam alkena meningkat apabila rantai bertambah panjang" },
        { correct: false, label: "Peratus karbon dalam alkana menurun apabila rantai bertambah panjang" },
        { correct: true, label: "Setiap alkena mengandungi 85.7% karbon mengikut jisim kerana formula amnya $$\\text{C}_n\\text{H}_{2n}$$, jadi alkena terbakar dengan nyalaan yang lebih berjelaga berbanding alkana dengan bilangan atom karbon yang sama" },
        { correct: false, label: "Metana mempunyai peratus karbon paling tinggi antara semua alkana" },
      ],
    },
  },
};

export default item;
