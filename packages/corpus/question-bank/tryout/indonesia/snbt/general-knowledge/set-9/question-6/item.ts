import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine moralische Regel über erwünschtes Verhalten",
        },
        {
          isCorrect: true,
          label: "eine Beschreibung des in einer Gruppe üblichen Verhaltens",
        },
        {
          isCorrect: false,
          label: "eine rechtliche Sanktion für verbotenes Verhalten",
        },
        {
          isCorrect: false,
          label: "die persönliche Vorliebe eines Fahrgasts",
        },
        {
          isCorrect: false,
          label: "die Handlung einer Person auf einer einzelnen Fahrt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "a moral rule about behaviour people ought to perform",
        },
        {
          isCorrect: true,
          label:
            "a description of behaviour commonly performed by people in a group",
        },
        {
          isCorrect: false,
          label: "a legal sanction for prohibited behaviour",
        },
        {
          isCorrect: false,
          label: "one passenger's personal preference",
        },
        {
          isCorrect: false,
          label: "a record of one person's action on one journey",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "aturan moral tentang perilaku yang seharusnya dilakukan",
        },
        {
          isCorrect: true,
          label:
            "gambaran mengenai perilaku yang lazim dilakukan orang dalam suatu kelompok",
        },
        {
          isCorrect: false,
          label: "sanksi hukum bagi perilaku yang dilarang",
        },
        {
          isCorrect: false,
          label: "kesukaan pribadi seorang penumpang",
        },
        {
          isCorrect: false,
          label: "catatan tentang tindakan satu orang pada satu perjalanan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
