import { Effect } from "effect";
import { decodeWorkflow, exactNeeds } from "#scripts/workflow/decode";
import { verifyNpmWorkflow } from "#scripts/workflow/npm";
import { ensure, WorkflowError } from "#scripts/workflow/requirement";

const CONTRACT_WORKFLOW = {
  packageArtifact: "contract-package",
  publishSha256:
    "3e93b7f0dad4a2dac41fb5951692f1140c18d2ad358387f41bb08864479603f5",
  repository: "nakafaai/aksara",
  verifierArtifact: "contract-verifier",
  workflowPath: ".github/workflows/contracts.yml",
} as const;
const DISPATCHED_RELEASE =
  "github.event_name == 'workflow_dispatch' && needs.build.outputs.mode == 'create'";

/** Verifies contract-specific staging and immutable release finalization. */
export const verifyProvenanceWorkflow = Effect.fn(
  "AksaraScripts.verifyProvenanceWorkflow"
)(function* (source: string) {
  const { jobs } = yield* decodeWorkflow(source);
  const { build, finalize, publish } = jobs;
  if (build === undefined || finalize === undefined || publish === undefined) {
    return yield* new WorkflowError({
      message: "Contract publication requires a finalize job",
    });
  }
  yield* ensure(
    publish.if === DISPATCHED_RELEASE,
    "Contract publication must run only in a dispatched release"
  );
  yield* ensure(
    finalize.if ===
      `always() && needs.build.result == 'success' && ${DISPATCHED_RELEASE}`,
    "Contract finalization must run only in a dispatched release"
  );
  yield* ensure(
    exactNeeds(finalize, ["build", "publish", "verify"]),
    "Contract finalization must consume every release gate"
  );
  yield* ensure(
    finalize.permissions?.["id-token"] === undefined,
    "Contract finalization must not receive npm OIDC identity"
  );
  yield* ensure(
    finalize.permissions?.attestations === "read",
    "Contract finalization must read archive attestations"
  );
  yield* ensure(
    finalize.permissions?.contents === "write",
    "Contract finalization must publish the immutable release"
  );
  yield* ensure(
    build.permissions?.attestations === "write",
    "Contract builds must attest exact archive bytes"
  );
  yield* ensure(
    publish.permissions?.attestations === "read",
    "Contract publication must verify archive attestations"
  );
  yield* ensure(
    publish.permissions?.contents === "write",
    "Contract publication must stage the draft release"
  );
  yield* verifyNpmWorkflow(source, CONTRACT_WORKFLOW);
});
