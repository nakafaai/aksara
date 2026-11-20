import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics chapter on the kinematics of linear motion. */
export const kssmForm5AdditionalMathematicsKinematicsNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-additional-mathematics-kinematics-of-linear-motion-linear-kinematics",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-kinematics"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 8.1 to 8.4",
            document: additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-additional-mathematics-kinematics-of-linear-motion",
    materialCard: {
      de: {
        description: "Leite Ort ab und integriere Beschleunigung.",
        title: "Kinematik geradliniger Bewegung",
      },
      en: {
        description: "Differentiate displacement, integrate acceleration.",
        title: "Kinematics of Linear Motion",
      },
      id: {
        description: "Turunkan perpindahan, integralkan percepatan.",
        title: "Kinematika Gerak Lurus",
      },
      ms: {
        description: "Bezakan sesaran dan kamirkan pecutan.",
        title: "Kinematik Gerakan Linear",
      },
    },
    order: 80,
    translations: {
      de: {
        routeSlug: "kinematik-geradliniger-bewegung",
        title: "Kinematik geradliniger Bewegung",
      },
      en: {
        routeSlug: "kinematics-of-linear-motion",
        title: "Kinematics of Linear Motion",
      },
      id: {
        routeSlug: "kinematika-gerak-lurus",
        title: "Kinematika Gerak Lurus",
      },
      ms: {
        routeSlug: "kinematik-gerakan-linear",
        title: "Kinematik Gerakan Linear",
      },
    },
  }),
];
