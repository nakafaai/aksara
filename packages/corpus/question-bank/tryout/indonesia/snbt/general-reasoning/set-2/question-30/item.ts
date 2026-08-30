import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kaliumreiche Lebensmittel können eine verordnete Blutdruckbehandlung ersetzen",
        },
        {
          isCorrect: false,
          label: "Kalium entfernt das gesamte Natrium aus dem Körper",
        },
        {
          isCorrect: false,
          label:
            "Je mehr Kalium jemand zu sich nimmt, desto niedriger ist sein Blutdruck in jedem Fall",
        },
        {
          isCorrect: true,
          label:
            "Kaliumreiche Lebensmittel können die Behandlung von Bluthochdruck unterstützen, doch mehr Kalium ist nicht automatisch für alle Menschen unbedenklich",
        },
        {
          isCorrect: false,
          label:
            "Jeder Mensch sollte ohne fachlichen Rat Kaliumpräparate einnehmen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Potassium-rich foods can replace prescribed blood-pressure treatment",
        },
        {
          isCorrect: false,
          label: "Potassium removes all sodium from the body",
        },
        {
          isCorrect: false,
          label:
            "The more potassium someone consumes, the lower their blood pressure will always be",
        },
        {
          isCorrect: true,
          label:
            "Potassium-rich foods may support blood-pressure management, but increasing potassium is not automatically safe for everyone",
        },
        {
          isCorrect: false,
          label:
            "Everyone should take potassium supplements without professional advice",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Makanan kaya kalium dapat menggantikan pengobatan tekanan darah yang diresepkan",
        },
        {
          isCorrect: false,
          label: "Kalium menghilangkan seluruh natrium dari tubuh",
        },
        {
          isCorrect: false,
          label:
            "Semakin banyak kalium dikonsumsi, tekanan darah akan selalu semakin rendah",
        },
        {
          isCorrect: true,
          label:
            "Makanan kaya kalium dapat membantu pengelolaan tekanan darah, tetapi menambah kalium tidak otomatis aman bagi semua orang",
        },
        {
          isCorrect: false,
          label:
            "Semua orang sebaiknya mengonsumsi suplemen kalium tanpa saran tenaga kesehatan",
        },
      ],
    },
  },
};

export default item;
