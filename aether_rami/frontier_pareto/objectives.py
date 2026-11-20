"""
RAMI-FrontierPareto: Multi-Objective Mathematical Functions
Defines explicit scalar objectives for Pareto optimization (minimization convention).
"""

from typing import Dict, Any

class DiscoveryObjectives:
    """
    Mathematical objective formulation where every objective f_i is minimized.
    """
    
    @staticmethod
    def obj_binding_affinity(cand: Dict[str, Any]) -> float:
        """
        Objective 1: Binding Affinity (pKd / pKi).
        Minimizes -pKd (higher affinity -> lower objective).
        """
        pkd = cand.get("pkd", cand.get("affinity", 7.0))
        return float(-pkd)

    @staticmethod
    def obj_selectivity_margin(cand: Dict[str, Any]) -> float:
        """
        Objective 2: Target Selectivity vs Counter-Targets.
        Minimizes -(pKd_on - pKd_off).
        """
        pkd_on = cand.get("pkd", 7.5)
        pkd_off = cand.get("pkd_off_target", cand.get("herg_pic50", 4.5))
        delta = pkd_on - pkd_off
        return float(-delta)

    @staticmethod
    def obj_admet_liability(cand: Dict[str, Any]) -> float:
        """
        Objective 3: ADMET Liability.
        Minimizes (1.0 - ADMET_Desirability).
        """
        admet_score = cand.get("admet_score", cand.get("admet_desirability_score", 0.8))
        return float(1.0 - admet_score)

    @staticmethod
    def obj_synthetic_complexity(cand: Dict[str, Any]) -> float:
        """
        Objective 4: Synthetic Complexity (SAScore).
        Minimizes SAScore (1.0 = trivial, 10.0 = inaccessible).
        """
        sa = cand.get("sascore", cand.get("sascore_approx", 3.0))
        return float(sa)

    @staticmethod
    def obj_lack_of_novelty(cand: Dict[str, Any]) -> float:
        """
        Objective 5: Chemical Familiarity (Tanimoto to nearest known drug).
        Minimizes Tanimoto similarity to maximize novelty.
        """
        sim = cand.get("max_similarity_to_known", 0.4)
        return float(sim)

    @classmethod
    def evaluate_vector(cls, cand: Dict[str, Any]) -> list[float]:
        """
        Evaluates candidate against all 5 objectives.
        Returns 5-dimensional objective vector [f1, f2, f3, f4, f5].
        """
        return [
            cls.obj_binding_affinity(cand),
            cls.obj_selectivity_margin(cand),
            cls.obj_admet_liability(cand),
            cls.obj_synthetic_complexity(cand),
            cls.obj_lack_of_novelty(cand)
        ]
