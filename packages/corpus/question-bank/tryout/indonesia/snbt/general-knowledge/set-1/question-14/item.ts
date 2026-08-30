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
              text: "Sri Utami erklärte, dass der Frost jedes Jahr auftritt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Nach Sonnenaufgang erreichte die Lufttemperatur fünf Grad.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Klare Eiskristalle bedeckten das Gras." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Besucher, die früh ankamen, fotografierten den Frost.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Weil der Himmel klar war, bildete sich Frost auf dem Gras.",
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
              text: "Sri Utami explained that frost occurs every year.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "After sunrise, the air temperature reached five degrees.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Clear ice crystals covered the grass." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Visitors who arrived early photographed the frost.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Because the sky was clear, frost formed on the grass.",
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
              text: "Sri Utami menjelaskan bahwa embun es terjadi setiap tahun.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setelah matahari terbit, suhu udara mencapai lima derajat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kristal es bening menutupi rumput." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pengunjung yang datang lebih awal memotret embun es.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Karena langit cerah, embun es terbentuk di atas rumput.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
