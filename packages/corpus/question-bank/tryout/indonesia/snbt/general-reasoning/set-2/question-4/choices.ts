import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Kind nimmt wenig Fett und viel Vitamin B6 auf",
      value: false,
    },
    {
      label: "Manche Kinder, die Bananen essen, nehmen wenig Fett auf",
      value: false,
    },
    {
      label: "Fleisch kann viel Fett, aber wenig Vitamin B6 liefern",
      value: false,
    },
    {
      label: "Das Kind nimmt überhaupt kein Fett auf",
      value: true,
    },
    {
      label: "Manche Kinder, die Bananen essen, nehmen viel Vitamin B6 auf",
      value: false,
    },
  ],
  en: [
    {
      label: "The child gets a small amount of fat and a lot of vitamin B6",
      value: false,
    },
    {
      label: "Some children who eat bananas get a small amount of fat",
      value: false,
    },
    {
      label: "Meat can provide a lot of fat but little vitamin B6",
      value: false,
    },
    { label: "The child will not get any fat", value: true },
    {
      label: "Some children who eat bananas get a lot of vitamin B6",
      value: false,
    },
  ],
  id: [
    {
      label: "Anak memperoleh sedikit lemak dan banyak vitamin B6",
      value: false,
    },
    {
      label: "Sebagian anak yang makan pisang memperoleh sedikit lemak",
      value: false,
    },
    {
      label: "Daging dapat memberikan banyak lemak tetapi sedikit vitamin B6",
      value: false,
    },
    { label: "Anak tidak akan mendapatkan lemak", value: true },
    {
      label: "Sebagian anak yang makan pisang memperoleh banyak vitamin B6",
      value: false,
    },
  ],
};

export default choices;
