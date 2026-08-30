import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "A findet vor D statt.", value: false },
    { label: "B findet vor C statt.", value: false },
    { label: "C findet vor A statt.", value: false },
    { label: "D findet vor B statt.", value: true },
    { label: "C findet im ersten Zeitslot statt.", value: false },
  ],
  en: [
    { label: "A takes place before D.", value: false },
    { label: "B takes place before C.", value: false },
    { label: "C takes place before A.", value: false },
    { label: "D takes place before B.", value: true },
    { label: "C is in the first session.", value: false },
  ],
  id: [
    { label: "A berlangsung sebelum D.", value: false },
    { label: "B berlangsung sebelum C.", value: false },
    { label: "C berlangsung sebelum A.", value: false },
    { label: "D berlangsung sebelum B.", value: true },
    { label: "C berlangsung pada sesi pertama.", value: false },
  ],
};

export default choices;
