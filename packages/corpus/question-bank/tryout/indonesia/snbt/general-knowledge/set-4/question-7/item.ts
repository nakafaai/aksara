import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "nur die zahlenmäßig größte Gruppe einschließen",
        },
        {
          isCorrect: false,
          label:
            "Befragte ohne Bezug zur Bevölkerungsstruktur gleich verteilen",
        },
        {
          isCorrect: true,
          label:
            "die Vielfalt der Gruppen angemessen abzubilden, über die eine Aussage gemacht werden soll",
        },
        {
          isCorrect: false,
          label: "für Datenerheber leicht erreichbare Gruppen bevorzugen",
        },
        {
          isCorrect: false,
          label: "viele Befragte haben, obwohl wichtige Gruppenarten fehlen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "including only the group with the largest population",
        },
        {
          isCorrect: false,
          label:
            "dividing respondents equally without considering population composition",
        },
        {
          isCorrect: true,
          label:
            "adequately reflecting the range of groups the claim is meant to describe",
        },
        {
          isCorrect: false,
          label: "prioritising the groups easiest for data collectors to reach",
        },
        {
          isCorrect: false,
          label:
            "having many respondents while omitting important kinds of group",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "hanya memuat kelompok yang jumlahnya paling besar",
        },
        {
          isCorrect: false,
          label:
            "membagi jumlah responden sama rata tanpa melihat komposisi populasi",
        },
        {
          isCorrect: true,
          label: "cukup mencerminkan ragam kelompok yang hendak dijelaskan",
        },
        {
          isCorrect: false,
          label:
            "mengutamakan kelompok yang paling mudah dijangkau pengumpul data",
        },
        {
          isCorrect: false,
          label:
            "memiliki responden banyak meskipun ragam kelompok penting tidak tercakup",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
