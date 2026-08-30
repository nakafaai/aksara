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
              text: "Entwaldung kann Böden anfälliger für Erosion machen",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Entwaldung allein verursachte 2019 fast alle vom Menschen verursachten Treibhausgasemissionen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Von der Abholzung betroffen sind auch Gemeinden, die Brennholz nutzen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Entwaldung bedroht die Lebensräume von Wildtieren",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Landnutzungssektor umfasst mehr als nur Entwaldung",
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
              text: "Deforestation can make soil more vulnerable to erosion",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Deforestation alone produced almost all human-caused greenhouse gas emissions in 2019",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Communities that use firewood are among those affected by deforestation",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Deforestation threatens wildlife habitats" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The land-use sector includes more than deforestation alone",
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
              text: "Deforestasi dapat membuat tanah lebih rentan terhadap erosi",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Deforestasi saja menghasilkan hampir seluruh emisi gas rumah kaca akibat aktivitas manusia pada 2019",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Masyarakat yang menggunakan kayu bakar menjadi salah satu yang terdampak deforestasi",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Deforestasi mengancam habitat satwa liar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sektor penggunaan lahan mencakup lebih dari deforestasi saja",
            },
          ],
        },
      ],
    },
  },
};

export default item;
