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
              text: "Kaliumreiche Lebensmittel können eine verordnete Blutdruckbehandlung ersetzen",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kaliumreiche Lebensmittel können die Behandlung von Bluthochdruck unterstützen, doch mehr Kalium ist nicht automatisch für alle Menschen unbedenklich",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kalium entfernt das gesamte Natrium aus dem Körper",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Je mehr Kalium jemand zu sich nimmt, desto niedriger ist sein Blutdruck in jedem Fall",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jeder Mensch sollte ohne fachlichen Rat Kaliumpräparate einnehmen",
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
              text: "Potassium-rich foods can replace prescribed blood-pressure treatment",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Potassium-rich foods may support blood-pressure management, but increasing potassium is not automatically safe for everyone",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Potassium removes all sodium from the body",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The more potassium someone consumes, the lower their blood pressure will always be",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Everyone should take potassium supplements without professional advice",
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
              text: "Makanan kaya kalium dapat menggantikan pengobatan tekanan darah yang diresepkan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Makanan kaya kalium dapat membantu pengelolaan tekanan darah, tetapi menambah kalium tidak otomatis aman bagi semua orang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kalium menghilangkan seluruh natrium dari tubuh",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semakin banyak kalium dikonsumsi, tekanan darah akan selalu semakin rendah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua orang sebaiknya mengonsumsi suplemen kalium tanpa saran tenaga kesehatan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
