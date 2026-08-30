import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn die Fahrpreise für öffentliche Verkehrsmittel steigen, steigen auch die Treibstoffpreise (BBM).",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Wenn es keine Erhöhung der Fahrpreise für öffentliche Verkehrsmittel gibt, dann gibt es auch keine Erhöhung der Treibstoffpreise (BBM).",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn die Preise für Grundbedürfnisse steigen, dann sind auch die Treibstoffpreise (BBM) gestiegen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jede Erhöhung der Treibstoffpreise (BBM) führt nicht zu einer Erhöhung der Preise für Grundbedürfnisse",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn es keine Erhöhung der Treibstoffpreise (BBM) gibt, dann gibt es auch keine Erhöhung der Preise für Grundbedürfnisse",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If there is an increase in public transportation fares, then there is an increase in fuel (BBM) prices",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "If there is no increase in public transportation fares, then there is no increase in fuel (BBM) prices",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If there is an increase in the prices of basic needs, then there has been an increase in fuel (BBM) prices",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every increase in fuel (BBM) prices results in no increase in the prices of basic needs",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If there is no increase in fuel (BBM) prices, then there is no increase in the prices of basic needs",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika terjadi kenaikan tarif angkutan umum maka terjadi kenaikan harga bahan bakar minyak (BBM)",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jika tidak ada kenaikan tarif angkutan umum maka tidak terjadi kenaikan harga bahan bakar minyak (BBM)",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika terjadi kenaikan harga kebutuhan pokok maka telah terjadi kenaikan harga bahan bakar minyak (BBM)",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap kenaikan harga bahan bakar minyak (BBM) maka tidak terjadi kenaikan harga kebutuhan pokok",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika tidak terjadi kenaikan harga bahan bakar minyak (BBM) maka tidak terjadi kenaikan harga kebutuhan pokok",
            },
          ],
        },
      ],
    },
  },
};

export default item;
