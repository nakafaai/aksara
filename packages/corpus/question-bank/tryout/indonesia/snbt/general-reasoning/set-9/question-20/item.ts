import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Hygrometer : Luftfeuchtigkeit",
        },
        {
          isCorrect: false,
          label: "Temperatur : Thermometer",
        },
        {
          isCorrect: false,
          label: "Entfernung : Kilometerzähler",
        },
        {
          isCorrect: false,
          label: "Waage : Geschwindigkeit",
        },
        {
          isCorrect: false,
          label: "Mikroskop : Lautstärke",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "hygrometer : humidity",
        },
        {
          isCorrect: false,
          label: "temperature : thermometer",
        },
        {
          isCorrect: false,
          label: "distance : odometer",
        },
        {
          isCorrect: false,
          label: "scale : speed",
        },
        {
          isCorrect: false,
          label: "microscope : loudness",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "higrometer : kelembapan",
        },
        {
          isCorrect: false,
          label: "suhu : termometer",
        },
        {
          isCorrect: false,
          label: "jarak : odometer",
        },
        {
          isCorrect: false,
          label: "timbangan : kecepatan",
        },
        {
          isCorrect: false,
          label: "mikroskop : intensitas bunyi",
        },
      ],
    },
  },
};

export default item;
