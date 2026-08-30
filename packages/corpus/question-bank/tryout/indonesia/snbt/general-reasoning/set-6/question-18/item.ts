import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Ein geringerer Verzehr industrieller Transfette verringert die Belastung durch einen vermeidbaren ernährungsbedingten Risikofaktor für koronare Herzkrankheiten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrielle Transfette behandeln die Symptome eines Schlaganfalls.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nur Menschen mit einer Nierenerkrankung müssen industrielle Transfette meiden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrielle Transfette steigern zuverlässig den Appetit.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrielle Transfette verhindern, dass der Körper sämtliche Nahrung verdaut.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Reducing industrial trans-fat intake reduces exposure to a preventable dietary risk for coronary heart disease.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrial trans fat treats the symptoms of a stroke.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Only people with kidney disease need to avoid industrial trans fat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrial trans fat reliably increases appetite.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Industrial trans fat prevents the body from digesting all food.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lemak trans industri mengobati gejala stroke.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hanya orang dengan penyakit ginjal yang perlu menghindari lemak trans industri.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lemak trans industri selalu meningkatkan nafsu makan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lemak trans industri membuat tubuh tidak dapat mencerna semua makanan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
