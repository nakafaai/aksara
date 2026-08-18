import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Reducing industrial trans-fat intake reduces exposure to a preventable dietary risk for coronary heart disease.",
      value: true,
    },
    {
      label: "Industrial trans fat treats the symptoms of a stroke.",
      value: false,
    },
    {
      label:
        "Only people with kidney disease need to avoid industrial trans fat.",
      value: false,
    },
    {
      label: "Industrial trans fat reliably increases appetite.",
      value: false,
    },
    {
      label: "Industrial trans fat prevents the body from digesting all food.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
      value: true,
    },
    { label: "Lemak trans industri mengobati gejala stroke.", value: false },
    {
      label:
        "Hanya orang dengan penyakit ginjal yang perlu menghindari lemak trans industri.",
      value: false,
    },
    {
      label: "Lemak trans industri selalu meningkatkan nafsu makan.",
      value: false,
    },
    {
      label:
        "Lemak trans industri membuat tubuh tidak dapat mencerna semua makanan.",
      value: false,
    },
  ],
};

export default choices;
