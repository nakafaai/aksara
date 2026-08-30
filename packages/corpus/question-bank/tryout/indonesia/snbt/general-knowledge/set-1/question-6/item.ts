import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die jüngsten alten DNA-Proben der Studie stammen aus der Zeit um $$600$$ n. Chr.",
        },
        {
          isCorrect: false,
          label:
            "In den archäologischen Überresten ließ sich keine Variola-DNA nachweisen.",
        },
        {
          isCorrect: true,
          label:
            "Etwa $$1{.}400$$ Jahre alte genetische Befunde helfen dabei, die Evolutionsgeschichte des Variola-Virus zu rekonstruieren.",
        },
        {
          isCorrect: false,
          label:
            "Die Studie beweist, dass die Pocken während der Wikingerzeit in Nordeuropa entstanden.",
        },
        {
          isCorrect: false,
          label: "Alle oben genannten Aussagen sind falsch.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The youngest ancient DNA samples in the study date to around $$600$$ CE.",
        },
        {
          isCorrect: false,
          label:
            "The archaeological remains contained no detectable variola DNA.",
        },
        {
          isCorrect: true,
          label:
            "Genetic evidence about $$1{,}400$$ years old helps reconstruct the evolutionary history of the variola virus.",
        },
        {
          isCorrect: false,
          label:
            "The study proves that smallpox originated in Viking Age northern Europe.",
        },
        {
          isCorrect: false,
          label: "All of the statements above are false.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sampel DNA purba termuda dalam penelitian tersebut berasal dari sekitar tahun $$600$$ M.",
        },
        {
          isCorrect: false,
          label:
            "Sisa arkeologis tersebut tidak mengandung DNA variola yang dapat dideteksi.",
        },
        {
          isCorrect: true,
          label:
            "Bukti genetik berusia sekitar $$1{.}400$$ tahun membantu merekonstruksi sejarah evolusi virus variola.",
        },
        {
          isCorrect: false,
          label:
            "Penelitian tersebut membuktikan bahwa cacar berasal dari Eropa utara pada Zaman Viking.",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan di atas salah.",
        },
      ],
    },
  },
};

export default item;
