"""
AETHER-RAMI: Custom Pipeline Interface for Hugging Face Transformers
Sole Author & Architect: Premchand Yadav | School of Bio Sciences and Technology (SBST) & SCOPE, VIT-AP University

Enables:
    from transformers import pipeline
    pipe = pipeline("drug-discovery", model="Premchan369/aether-rami-esm2-diffsbdd", trust_remote_code=True)
    res = pipe("O=C(C=C)N1CCN(c2nc(Nc3ccc(F)c(F)c3)nc3cc(O)c(F)cc23)CC1", target="KRAS_G12C")
"""

import torch
from typing import Dict, Any, Union

try:
    from transformers.pipelines.base import Pipeline
except Exception:
    class Pipeline:
        def __init__(self, model=None, **kwargs):
            self.model = model


class AetherRamiPipeline(Pipeline):
    """
    Unified pipeline for 16B MoE biopharmaceutical discovery, Foldseek pocket RAG,
    resistance mutation bypass, and GTEx healthy diploid safety profiling.
    """
    def _sanitize_parameters(self, target="KRAS_G12C", mutation="Y96D", **kwargs):
        preprocess_kwargs = {"target": target, "mutation": mutation}
        return preprocess_kwargs, {}, {}

    def preprocess(self, inputs: Union[str, Dict[str, Any]], target: str = "KRAS_G12C", mutation: str = "Y96D") -> Dict[str, Any]:
        if isinstance(inputs, str):
            smiles = inputs
        elif isinstance(inputs, dict):
            smiles = inputs.get("smiles", "")
            target = inputs.get("target", target)
            mutation = inputs.get("mutation", mutation)
        else:
            smiles = str(inputs)

        return {"smiles": smiles, "target": target, "mutation": mutation}

    def _forward(self, model_inputs: Dict[str, Any]) -> Dict[str, Any]:
        smiles = model_inputs["smiles"]
        target = model_inputs["target"]
        mutation = model_inputs["mutation"]

        affinity = self.model.predict_affinity(smiles, target)
        bypass = self.model.predict_resistance_bypass(smiles, target, mutation)
        foldseek_data = self.model.retrieve_homologues_foldseek(target, top_k=2)
        safety_data = self.model.screen_safety_gtex(target, smiles)

        return {
            "smiles": smiles,
            "target": target,
            "mutation": mutation,
            "predicted_Kd_nM": affinity["predicted_Kd_nM"],
            "predicted_pKd": affinity["predicted_pKd"],
            "binding_delta_g_kcal_mol": affinity["binding_delta_g_kcal_mol"],
            "status": affinity["status"],
            "active_moe_experts": affinity.get("active_moe_experts", []),
            "mutant_Kd_nM": bypass["mutant_Kd_nM"],
            "fold_resistance_change": bypass["fold_resistance_change"],
            "bypass_verdict": bypass["bypass_verdict"],
            "foldseek_representative_pdb": foldseek_data.get("representative_pdb", "N/A"),
            "foldseek_avg_tm_score": foldseek_data.get("average_tm_score", 0.0),
            "foldseek_plddt": foldseek_data.get("plddt_confidence", 0.0),
            "gtex_safety_margin": safety_data.get("gtex_healthy_tissue_safety", {}).get("normal_cell_safety_margin", "Broad Margin"),
            "fda_standard_of_care": safety_data.get("fda_standard_of_care_benchmark", {}).get("standard_of_care", "Standard")
        }

    def postprocess(self, model_outputs: Dict[str, Any]) -> Dict[str, Any]:
        return model_outputs

    def __call__(self, inputs, **kwargs):
        model_inputs = self.preprocess(inputs, **kwargs)
        outputs = self._forward(model_inputs)
        return self.postprocess(outputs)
