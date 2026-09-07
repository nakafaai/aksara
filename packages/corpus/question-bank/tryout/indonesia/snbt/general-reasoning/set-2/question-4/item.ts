import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das Kind nimmt wenig Fett und Vitamin B6 auf",
        },
        {
          isCorrect: true,
          label: "Das Kind nimmt überhaupt kein Fett auf",
        },
        {
          isCorrect: false,
          label: "Manche Kinder, die Bananen essen, nehmen wenig Fett auf",
        },
        {
          isCorrect: false,
          label: "Auch andere Lebensmittel können Vitamin B6 liefern",
        },
        {
          isCorrect: false,
          label: "Manche Kinder, die Bananen essen, nehmen Vitamin B6 auf",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The child gets a small amount of fat and vitamin B6",
        },
        {
          isCorrect: true,
          label: "The child will not get any fat",
        },
        {
          isCorrect: false,
          label: "Some children who eat bananas get a small amount of fat",
        },
        {
          isCorrect: false,
          label: "Bananas are not the only food that can provide vitamin B6",
        },
        {
          isCorrect: false,
          label: "Some children who eat bananas get vitamin B6",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anak memperoleh sedikit lemak dan vitamin B6",
        },
        {
          isCorrect: true,
          label: "Anak tidak akan mendapatkan lemak",
        },
        {
          isCorrect: false,
          label: "Sebagian anak yang makan pisang memperoleh sedikit lemak",
        },
        {
          isCorrect: false,
          label:
            "Pisang bukan satu-satunya makanan yang dapat memberikan vitamin B6",
        },
        {
          isCorrect: false,
          label: "Sebagian anak yang makan pisang memperoleh vitamin B6",
        },
      ],
    },
  },
};

export default item;
