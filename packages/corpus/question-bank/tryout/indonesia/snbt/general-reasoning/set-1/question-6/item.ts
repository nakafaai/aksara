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
              text: "Das Ministerium setzte sein gesamtes Budget ein, um einen dauerhaften Anstieg bei jeder Kulturpflanze zu garantieren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Maisproduktion stieg im Berichtszeitraum weniger als die Reisproduktion.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Zahlen beweisen, dass die Neuausrichtung des Budgets die einzige Ursache für die Produktionssteigerungen war.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das Ministerium räumte der Produktionsförderung Vorrang ein, und seine Veröffentlichung von 2017 berichtete über historische Zuwächse bei Reis und Mais.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der verbleibende Anteil des Ministeriumsbudgets wurde nicht verwendet.",
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
              text: "The ministry used its entire budget to guarantee a permanent rise in every crop.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Corn production rose less than rice production during the reported period.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The figures prove that redirecting the budget was the only cause of the production increases.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The ministry prioritized production support, and its 2017 publication reported historical increases in rice and corn production.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The remaining share of the ministry's budget was unused.",
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
              text: "Kementerian menggunakan seluruh anggarannya untuk menjamin kenaikan permanen pada setiap tanaman pangan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Produksi jagung meningkat lebih sedikit daripada produksi padi pada periode yang dilaporkan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Angka-angka tersebut membuktikan bahwa perubahan arah anggaran merupakan satu-satunya penyebab kenaikan produksi.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kementerian memprioritaskan dukungan produksi, dan publikasi tahun 2017 melaporkan kenaikan historis produksi padi dan jagung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sisa anggaran kementerian tidak digunakan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
