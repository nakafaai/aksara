import assert from "node:assert/strict";
import { decodeWorkflow, exactNeeds } from "#scripts/workflow/decode";
import { verifyNpmWorkflow } from "#scripts/workflow/npm";

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
export function verifyProvenanceWorkflow(source: string): void {
  const { jobs } = decodeWorkflow(source);
  const { build, finalize, publish } = jobs;
  assert.ok(
    build && finalize && publish,
    "Contract publication requires a finalize job"
  );
  assert.equal(
    publish.if,
    DISPATCHED_RELEASE,
    "Contract publication must run only in a dispatched release"
  );
  assert.equal(
    finalize.if,
    `always() && needs.build.result == 'success' && ${DISPATCHED_RELEASE}`,
    "Contract finalization must run only in a dispatched release"
  );
  assert.ok(
    exactNeeds(finalize, ["build", "publish", "verify"]),
    "Contract finalization must consume every release gate"
  );
  assert.equal(
    finalize.permissions?.["id-token"],
    undefined,
    "Contract finalization must not receive npm OIDC identity"
  );
  assert.equal(
    finalize.permissions?.attestations,
    "read",
    "Contract finalization must read archive attestations"
  );
  assert.equal(
    finalize.permissions?.contents,
    "write",
    "Contract finalization must publish the immutable release"
  );
  assert.equal(
    build.permissions?.attestations,
    "write",
    "Contract builds must attest exact archive bytes"
  );
  assert.equal(
    publish.permissions?.attestations,
    "read",
    "Contract publication must verify archive attestations"
  );
  assert.equal(
    publish.permissions?.contents,
    "write",
    "Contract publication must stage the draft release"
  );
  verifyNpmWorkflow(source, CONTRACT_WORKFLOW);
}
