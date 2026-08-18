import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die jüngsten alten DNA-Proben der Studie stammen aus der Zeit um $$600$$ n. Chr.",
      value: false,
    },
    {
      label:
        "In den archäologischen Überresten ließ sich keine Variola-DNA nachweisen.",
      value: false,
    },
    {
      label:
        "Etwa $$1{.}400$$ Jahre alte genetische Befunde helfen dabei, die Evolutionsgeschichte des Variola-Virus zu rekonstruieren.",
      value: true,
    },
    {
      label:
        "Die Studie beweist, dass die Pocken während der Wikingerzeit in Nordeuropa entstanden.",
      value: false,
    },
    {
      label: "Alle oben genannten Aussagen sind falsch.",
      value: false,
    },
  ],
};

export default choices;
