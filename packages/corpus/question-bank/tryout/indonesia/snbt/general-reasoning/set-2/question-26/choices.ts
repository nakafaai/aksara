import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "X leitet elektrischen Strom.", value: false },
    { label: "X besteht nicht aus Keramik.", value: false },
    { label: "X leitet keinen elektrischen Strom.", value: true },
    { label: "Nur X in Kiste Q besteht aus Keramik.", value: false },
    {
      label: "Alle nicht leitenden Gegenstände befinden sich in Kiste Q.",
      value: false,
    },
  ],
  en: [
    { label: "X conducts electricity.", value: false },
    { label: "X is not made of ceramic.", value: false },
    { label: "X does not conduct electricity.", value: true },
    { label: "X is the only ceramic object in box Q.", value: false },
    { label: "All non-conductive objects are in box Q.", value: false },
  ],
  id: [
    { label: "X menghantarkan listrik.", value: false },
    { label: "X tidak terbuat dari keramik.", value: false },
    { label: "X tidak menghantarkan listrik.", value: true },
    {
      label: "Hanya X yang terbuat dari keramik di dalam kotak Q.",
      value: false,
    },
    {
      label: "Semua benda yang tidak menghantarkan listrik berada di kotak Q.",
      value: false,
    },
  ],
};

export default choices;
