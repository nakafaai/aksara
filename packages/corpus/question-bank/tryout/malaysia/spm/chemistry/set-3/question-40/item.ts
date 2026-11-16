import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "5.0 cm³ per dose and at most 20 cm³ a day, and paracetamol is an analgesic" },
        { correct: false, label: "12.5 cm³ per dose and at most 50 cm³ a day, and paracetamol is an antibiotic that kills bacteria" },
        { correct: false, label: "2.5 cm³ per dose and at most 10 cm³ a day, and paracetamol is an analgesic" },
        { correct: true, label: "12.5 cm³ per dose and at most 50 cm³ a day, and paracetamol is an analgesic that relieves pain and fever" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "5.0 cm³ setiap dos dan paling banyak 20 cm³ sehari, dan parasetamol ialah analgesik" },
        { correct: false, label: "12.5 cm³ setiap dos dan paling banyak 50 cm³ sehari, dan parasetamol ialah antibiotik yang membunuh bakteria" },
        { correct: false, label: "2.5 cm³ setiap dos dan paling banyak 10 cm³ sehari, dan parasetamol ialah analgesik" },
        { correct: true, label: "12.5 cm³ setiap dos dan paling banyak 50 cm³ sehari, dan parasetamol ialah analgesik yang melegakan sakit dan demam" },
      ],
    },
  },
};

export default item;
