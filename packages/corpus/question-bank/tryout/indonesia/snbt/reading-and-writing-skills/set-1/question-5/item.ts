import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Bootsform des Sarkophags von Tomok." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Megalithische Überreste am Tobasee." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Schutzfiguren auf Gräbern der Toba-Batak." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Sarkophag von Tomok in der megalithischen Tradition der Toba-Batak.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bestattungsbräuche auf der Insel Samosir." },
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
            { kind: "text", text: "The Boat Form of the Tomok Sarcophagus." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Megalithic Remains around Lake Toba." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Protective Figures on Toba Batak Graves." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The Tomok Sarcophagus in the Toba Batak Megalithic Tradition.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Burial Customs on Samosir Island." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bentuk Kapal pada Sarkofagus Tomok." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tinggalan Megalitik di Sekitar Danau Toba.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Figur Pelindung pada Kubur Batak Toba." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sarkofagus Tomok dalam Tradisi Megalitik Batak Toba.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Adat Penguburan di Pulau Samosir." }],
        },
      ],
    },
  },
};

export default item;
