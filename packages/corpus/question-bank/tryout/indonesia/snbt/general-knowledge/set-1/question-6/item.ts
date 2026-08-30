import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die jüngsten alten DNA-Proben der Studie stammen aus der Zeit um ",
            },
            { display: "block", kind: "math", math: "600" },
            { kind: "text", text: " n. Chr." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In den archäologischen Überresten ließ sich keine Variola-DNA nachweisen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Etwa " },
            { display: "block", kind: "math", math: "1{.}400" },
            {
              kind: "text",
              text: " Jahre alte genetische Befunde helfen dabei, die Evolutionsgeschichte des Variola-Virus zu rekonstruieren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Studie beweist, dass die Pocken während der Wikingerzeit in Nordeuropa entstanden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Alle oben genannten Aussagen sind falsch." },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The youngest ancient DNA samples in the study date to around ",
            },
            { display: "block", kind: "math", math: "600" },
            { kind: "text", text: " CE." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The archaeological remains contained no detectable variola DNA.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Genetic evidence about " },
            { display: "block", kind: "math", math: "1{,}400" },
            {
              kind: "text",
              text: " years old helps reconstruct the evolutionary history of the variola virus.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The study proves that smallpox originated in Viking Age northern Europe.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "All of the statements above are false." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sampel DNA purba termuda dalam penelitian tersebut berasal dari sekitar tahun ",
            },
            { display: "block", kind: "math", math: "600" },
            { kind: "text", text: " M." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sisa arkeologis tersebut tidak mengandung DNA variola yang dapat dideteksi.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Bukti genetik berusia sekitar " },
            { display: "block", kind: "math", math: "1{.}400" },
            {
              kind: "text",
              text: " tahun membantu merekonstruksi sejarah evolusi virus variola.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penelitian tersebut membuktikan bahwa cacar berasal dari Eropa utara pada Zaman Viking.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Semua pernyataan di atas salah." }],
        },
      ],
    },
  },
};

export default item;
