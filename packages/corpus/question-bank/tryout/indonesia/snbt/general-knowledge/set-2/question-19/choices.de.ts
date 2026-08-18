import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "mehr Beratungspersonal einsetzen, ohne Management oder Umweltschutz zu verändern.",
      value: false,
    },
    {
      label:
        "menschliche Fähigkeiten, wissenschaftlich begründetes Management, Lebensraumschutz und passende Aquakulturtechnik gemeinsam stärken.",
      value: true,
    },
    {
      label:
        "sich ausschließlich auf die Wasserqualität dicht besiedelter Küstengebiete konzentrieren.",
      value: false,
    },
    {
      label:
        "Fanggeräte und Subventionen ausweiten, damit die Fangmenge kurzfristig steigt.",
      value: false,
    },
    {
      label:
        "zuerst die Fänge erhöhen und Bestandsdaten erst nach einem Produktionsrückgang erheben.",
      value: false,
    },
  ],
};

export default choices;
