import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Ministerium setzte sein gesamtes Budget ein, um einen dauerhaften Anstieg bei jeder Kulturpflanze zu garantieren.",
        },
        {
          isCorrect: false,
          label:
            "Die Maisproduktion stieg im Berichtszeitraum weniger als die Reisproduktion.",
        },
        {
          isCorrect: true,
          label:
            "Das Ministerium räumte der Produktionsförderung Vorrang ein, und seine Veröffentlichung von 2017 berichtete über historische Zuwächse bei Reis und Mais.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen beweisen, dass die Neuausrichtung des Budgets die einzige Ursache für die Produktionssteigerungen war.",
        },
        {
          isCorrect: false,
          label:
            "Der verbleibende Anteil des Ministeriumsbudgets wurde nicht verwendet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The ministry used its entire budget to guarantee a permanent rise in every crop.",
        },
        {
          isCorrect: false,
          label:
            "Corn production rose less than rice production during the reported period.",
        },
        {
          isCorrect: true,
          label:
            "The ministry prioritized production support, and its 2017 publication reported historical increases in rice and corn production.",
        },
        {
          isCorrect: false,
          label:
            "The figures prove that redirecting the budget was the only cause of the production increases.",
        },
        {
          isCorrect: false,
          label: "The remaining share of the ministry's budget was unused.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kementerian menggunakan seluruh anggarannya untuk menjamin kenaikan permanen pada setiap tanaman pangan.",
        },
        {
          isCorrect: false,
          label:
            "Produksi jagung meningkat lebih sedikit daripada produksi padi pada periode yang dilaporkan.",
        },
        {
          isCorrect: true,
          label:
            "Kementerian memprioritaskan dukungan produksi, dan publikasi tahun 2017 melaporkan kenaikan historis produksi padi dan jagung.",
        },
        {
          isCorrect: false,
          label:
            "Angka-angka tersebut membuktikan bahwa perubahan arah anggaran merupakan satu-satunya penyebab kenaikan produksi.",
        },
        {
          isCorrect: false,
          label: "Sisa anggaran kementerian tidak digunakan.",
        },
      ],
    },
  },
};

export default item;
