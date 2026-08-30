import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Wenn es keine Erhöhung der Fahrpreise für öffentliche Verkehrsmittel gibt, dann gibt es auch keine Erhöhung der Treibstoffpreise (BBM).",
        },
        {
          isCorrect: false,
          label:
            "Wenn die Fahrpreise für öffentliche Verkehrsmittel steigen, steigen auch die Treibstoffpreise (BBM).",
        },
        {
          isCorrect: false,
          label:
            "Wenn die Preise für Grundbedürfnisse steigen, dann sind auch die Treibstoffpreise (BBM) gestiegen",
        },
        {
          isCorrect: false,
          label:
            "Jede Erhöhung der Treibstoffpreise (BBM) führt nicht zu einer Erhöhung der Preise für Grundbedürfnisse",
        },
        {
          isCorrect: false,
          label:
            "Wenn es keine Erhöhung der Treibstoffpreise (BBM) gibt, dann gibt es auch keine Erhöhung der Preise für Grundbedürfnisse",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "If there is no increase in public transportation fares, then there is no increase in fuel (BBM) prices",
        },
        {
          isCorrect: false,
          label:
            "If there is an increase in public transportation fares, then there is an increase in fuel (BBM) prices",
        },
        {
          isCorrect: false,
          label:
            "If there is an increase in the prices of basic needs, then there has been an increase in fuel (BBM) prices",
        },
        {
          isCorrect: false,
          label:
            "Every increase in fuel (BBM) prices results in no increase in the prices of basic needs",
        },
        {
          isCorrect: false,
          label:
            "If there is no increase in fuel (BBM) prices, then there is no increase in the prices of basic needs",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Jika tidak ada kenaikan tarif angkutan umum maka tidak terjadi kenaikan harga bahan bakar minyak (BBM)",
        },
        {
          isCorrect: false,
          label:
            "Jika terjadi kenaikan tarif angkutan umum maka terjadi kenaikan harga bahan bakar minyak (BBM)",
        },
        {
          isCorrect: false,
          label:
            "Jika terjadi kenaikan harga kebutuhan pokok maka telah terjadi kenaikan harga bahan bakar minyak (BBM)",
        },
        {
          isCorrect: false,
          label:
            "Setiap kenaikan harga bahan bakar minyak (BBM) maka tidak terjadi kenaikan harga kebutuhan pokok",
        },
        {
          isCorrect: false,
          label:
            "Jika tidak terjadi kenaikan harga bahan bakar minyak (BBM) maka tidak terjadi kenaikan harga kebutuhan pokok",
        },
      ],
    },
  },
};

export default item;
