import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das Ministerium setzte sein gesamtes Budget ein, um einen dauerhaften Anstieg bei jeder Kulturpflanze zu garantieren.",
      value: false,
    },
    {
      label:
        "Die Maisproduktion stieg im Berichtszeitraum weniger als die Reisproduktion.",
      value: false,
    },
    {
      label:
        "Die Zahlen beweisen, dass die Neuausrichtung des Budgets die einzige Ursache für die Produktionssteigerungen war.",
      value: false,
    },
    {
      label:
        "Das Ministerium räumte der Produktionsförderung Vorrang ein, und seine Veröffentlichung von 2017 berichtete über historische Zuwächse bei Reis und Mais.",
      value: true,
    },
    {
      label:
        "Der verbleibende Anteil des Ministeriumsbudgets wurde nicht verwendet.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "The ministry used its entire budget to guarantee a permanent rise in every crop.",
      value: false,
    },
    {
      label:
        "Corn production rose less than rice production during the reported period.",
      value: false,
    },
    {
      label:
        "The figures prove that redirecting the budget was the only cause of the production increases.",
      value: false,
    },
    {
      label:
        "The ministry prioritized production support, and its 2017 publication reported historical increases in rice and corn production.",
      value: true,
    },
    {
      label: "The remaining share of the ministry's budget was unused.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Kementerian menggunakan seluruh anggarannya untuk menjamin kenaikan permanen pada setiap tanaman pangan.",
      value: false,
    },
    {
      label:
        "Produksi jagung meningkat lebih sedikit daripada produksi padi pada periode yang dilaporkan.",
      value: false,
    },
    {
      label:
        "Angka-angka tersebut membuktikan bahwa perubahan arah anggaran merupakan satu-satunya penyebab kenaikan produksi.",
      value: false,
    },
    {
      label:
        "Kementerian memprioritaskan dukungan produksi, dan publikasi tahun 2017 melaporkan kenaikan historis produksi padi dan jagung.",
      value: true,
    },
    {
      label: "Sisa anggaran kementerian tidak digunakan.",
      value: false,
    },
  ],
};

export default choices;
