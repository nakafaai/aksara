import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wachstum sank von " },
            { display: "block", kind: "math", math: "2013" },
            { kind: "text", text: " bis " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " in jedem Jahr" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Zwischen " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "2017" },
            { kind: "text", text: " ging das Wachstum nie zurück" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nach " },
            { display: "block", kind: "math", math: "2015" },
            {
              kind: "text",
              text: " war keine Erholung des Wachstums erkennbar",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Rückgang von " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " auf " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " war größer als der Anstieg von " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " auf " },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Die Wachstumsrate von " },
            { display: "block", kind: "math", math: "2013" },
            { kind: "text", text: " war höher als jede Rate von " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " bis " },
            { display: "block", kind: "math", math: "2018" },
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
            { kind: "text", text: "Growth declined every year from " },
            { display: "block", kind: "math", math: "2013" },
            { kind: "text", text: " through " },
            { display: "block", kind: "math", math: "2018" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Growth never declined between " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "2017" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Growth showed no recovery after " },
            { display: "block", kind: "math", math: "2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The decline from " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " to " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " was larger than the rise from " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " to " },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The " },
            { display: "block", kind: "math", math: "2013" },
            {
              kind: "text",
              text: " growth rate was higher than every rate from ",
            },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " through " },
            { display: "block", kind: "math", math: "2018" },
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
            { kind: "text", text: "Pertumbuhan menurun setiap tahun dari " },
            { display: "block", kind: "math", math: "2013" },
            { kind: "text", text: " hingga " },
            { display: "block", kind: "math", math: "2018" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pertumbuhan tidak pernah menurun antara " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "2017" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pertumbuhan tidak menunjukkan pemulihan setelah ",
            },
            { display: "block", kind: "math", math: "2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penurunan dari " },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " ke " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " lebih besar daripada kenaikan dari " },
            { display: "block", kind: "math", math: "2015" },
            { kind: "text", text: " ke " },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Tingkat pertumbuhan " },
            { display: "block", kind: "math", math: "2013" },
            {
              kind: "text",
              text: " lebih tinggi daripada setiap tingkat pada ",
            },
            { display: "block", kind: "math", math: "2014" },
            { kind: "text", text: " hingga " },
            { display: "block", kind: "math", math: "2018" },
          ],
        },
      ],
    },
  },
};

export default item;
