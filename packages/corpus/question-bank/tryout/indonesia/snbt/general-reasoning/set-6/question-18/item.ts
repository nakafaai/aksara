import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Ein geringerer Verzehr industrieller Transfette verringert die Belastung durch einen vermeidbaren ernährungsbedingten Risikofaktor für koronare Herzkrankheiten.",
        },
        {
          isCorrect: false,
          label:
            "Industrielle Transfette behandeln die Symptome eines Schlaganfalls.",
        },
        {
          isCorrect: false,
          label:
            "Nur Menschen mit einer Nierenerkrankung müssen industrielle Transfette meiden.",
        },
        {
          isCorrect: false,
          label: "Industrielle Transfette steigern zuverlässig den Appetit.",
        },
        {
          isCorrect: false,
          label:
            "Industrielle Transfette verhindern, dass der Körper sämtliche Nahrung verdaut.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Reducing industrial trans-fat intake reduces exposure to a preventable dietary risk for coronary heart disease.",
        },
        {
          isCorrect: false,
          label: "Industrial trans fat treats the symptoms of a stroke.",
        },
        {
          isCorrect: false,
          label:
            "Only people with kidney disease need to avoid industrial trans fat.",
        },
        {
          isCorrect: false,
          label: "Industrial trans fat reliably increases appetite.",
        },
        {
          isCorrect: false,
          label:
            "Industrial trans fat prevents the body from digesting all food.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
        },
        {
          isCorrect: false,
          label: "Lemak trans industri mengobati gejala stroke.",
        },
        {
          isCorrect: false,
          label:
            "Hanya orang dengan penyakit ginjal yang perlu menghindari lemak trans industri.",
        },
        {
          isCorrect: false,
          label: "Lemak trans industri selalu meningkatkan nafsu makan.",
        },
        {
          isCorrect: false,
          label:
            "Lemak trans industri membuat tubuh tidak dapat mencerna semua makanan.",
        },
      ],
    },
  },
};

export default item;
