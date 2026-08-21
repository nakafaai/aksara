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
  en: [
    {
      label:
        "The youngest ancient DNA samples in the study date to around $$600$$ CE.",
      value: false,
    },
    {
      label: "The archaeological remains contained no detectable variola DNA.",
      value: false,
    },
    {
      label:
        "Genetic evidence about $$1{,}400$$ years old helps reconstruct the evolutionary history of the variola virus.",
      value: true,
    },
    {
      label:
        "The study proves that smallpox originated in Viking Age northern Europe.",
      value: false,
    },
    {
      label: "All of the statements above are false.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Sampel DNA purba termuda dalam penelitian tersebut berasal dari sekitar tahun $$600$$ M.",
      value: false,
    },
    {
      label:
        "Sisa arkeologis tersebut tidak mengandung DNA variola yang dapat dideteksi.",
      value: false,
    },
    {
      label:
        "Bukti genetik berusia sekitar $$1{.}400$$ tahun membantu merekonstruksi sejarah evolusi virus variola.",
      value: true,
    },
    {
      label:
        "Penelitian tersebut membuktikan bahwa cacar berasal dari Eropa utara pada Zaman Viking.",
      value: false,
    },
    {
      label: "Semua pernyataan di atas salah.",
      value: false,
    },
  ],
};

export default choices;
