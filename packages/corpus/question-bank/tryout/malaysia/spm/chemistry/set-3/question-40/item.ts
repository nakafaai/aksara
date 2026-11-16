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
        { correct: false, label: "Ascorbic acid is a preservative, and monosodium glutamate is a colouring" },
        { correct: false, label: "Tartrazine is a flavour enhancer that strengthens the taste of the noodles" },
        { correct: false, label: "Monosodium glutamate is an antioxidant that stops fats turning rancid" },
        { correct: true, label: "Sodium benzoate is a preservative that slows the growth of microorganisms, and ascorbic acid is an antioxidant that slows the oxidation of fats" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Asid askorbik ialah pengawet, dan mononatrium glutamat ialah pewarna" },
        { correct: false, label: "Tartrazina ialah penambah perisa yang menguatkan rasa mi" },
        { correct: false, label: "Mononatrium glutamat ialah antioksidan yang menghalang lemak menjadi tengik" },
        { correct: true, label: "Natrium benzoat ialah pengawet yang melambatkan pertumbuhan mikroorganisma, dan asid askorbik ialah antioksidan yang melambatkan pengoksidaan lemak" },
      ],
    },
  },
};

export default item;
