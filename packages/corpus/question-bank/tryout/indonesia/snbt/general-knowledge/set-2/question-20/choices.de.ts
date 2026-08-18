import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das ist eine große Menge, doch Nachhaltigkeit lässt sich nicht allein an der Tonnage messen.",
      value: false,
    },
    {
      label:
        "Das von der FAO und dem Ministerium unterstützte IFish-Programm fördert ökosystembasiertes Management, nationale Kompetenzstandards und die Beteiligung lokaler Gemeinschaften an der Binnenfischerei.",
      value: false,
    },
    {
      label:
        "Das Fischereimanagement braucht verlässliche Daten, sodass Entscheidungen auf örtliche Bedingungen reagieren können.",
      value: true,
    },
    {
      label:
        "Einfach mehr Fanggeräte einzusetzen, könnte den Druck erhöhen, ohne Management- oder Umweltprobleme zu lösen.",
      value: false,
    },
    {
      label:
        "Langfristige Produktion hängt von leistungsfähigen Systemen ab, in denen Bestände und Lebensräume gesund bleiben.",
      value: false,
    },
  ],
};

export default choices;
