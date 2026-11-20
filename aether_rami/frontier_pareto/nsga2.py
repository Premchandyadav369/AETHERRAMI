"""
RAMI-FrontierPareto: NSGA-II Multi-Objective Pareto Optimization Engine
Implements Deb's fast non-dominated sorting, crowding distance calculation,
and analytical Pareto frontier verification across multi-dimensional objective landscapes.
"""

import numpy as np
from typing import List, Dict, Any
from .objectives import DiscoveryObjectives

class ParetoOptimizer:
    """
    NSGA-II Non-dominated sorting and candidate prioritization engine.
    """
    def __init__(self):
        self.evaluator = DiscoveryObjectives()

    def dominates(self, obj_p: List[float], obj_q: List[float]) -> bool:
        """
        Returns True if objective vector p dominates q in minimization:
        p_i <= q_i for all i, and p_j < q_j for at least one j.
        """
        all_le = all(p <= q for p, q in zip(obj_p, obj_q))
        at_least_one_lt = any(p < q for p, q in zip(obj_p, obj_q))
        return all_le and at_least_one_lt

    def fast_non_dominated_sort(self, population_objs: List[List[float]]) -> List[List[int]]:
        """
        Partitions population into Pareto fronts F_1, F_2, ..., F_k.
        F_1 contains all non-dominated candidates (Rank 1).
        """
        N = len(population_objs)
        domination_counts = [0] * N
        dominated_solutions = [[] for _ in range(N)]
        fronts = [[]]
        
        for p in range(N):
            for q in range(p + 1, N):
                if self.dominates(population_objs[p], population_objs[q]):
                    dominated_solutions[p].append(q)
                    domination_counts[q] += 1
                elif self.dominates(population_objs[q], population_objs[p]):
                    dominated_solutions[q].append(p)
                    domination_counts[p] += 1
                    
            if domination_counts[p] == 0:
                fronts[0].append(p)
                
        i = 0
        while len(fronts[i]) > 0:
            next_front = []
            for p in fronts[i]:
                for q in dominated_solutions[p]:
                    domination_counts[q] -= 1
                    if domination_counts[q] == 0:
                        next_front.append(q)
            i += 1
            fronts.append(next_front)
            
        return [f for f in fronts if len(f) > 0]

    def calculate_crowding_distance(self, front: List[int], population_objs: List[List[float]]) -> Dict[int, float]:
        """
        Assigns crowding distance to individuals in a given front to maintain diversity.
        Boundary points receive infinite distance.
        """
        num_individuals = len(front)
        if num_individuals == 0:
            return {}
        if num_individuals <= 2:
            return {idx: float("inf") for idx in front}
            
        num_objectives = len(population_objs[0])
        distances = {idx: 0.0 for idx in front}
        
        for m in range(num_objectives):
            sorted_front = sorted(front, key=lambda idx: population_objs[idx][m])
            
            distances[sorted_front[0]] = float("inf")
            distances[sorted_front[-1]] = float("inf")
            
            obj_min = population_objs[sorted_front[0]][m]
            obj_max = population_objs[sorted_front[-1]][m]
            obj_range = obj_max - obj_min
            if obj_range < 1e-8:
                obj_range = 1e-8
                
            for k in range(1, num_individuals - 1):
                prev_val = population_objs[sorted_front[k - 1]][m]
                next_val = population_objs[sorted_front[k + 1]][m]
                distances[sorted_front[k]] += (next_val - prev_val) / obj_range
                
        return distances

    def rank_candidates(self, candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Executes complete NSGA-II sorting over candidate list.
        Augments candidates with pareto_rank, crowding_distance, and objective_vector.
        """
        if not candidates:
            return []
            
        pop_objs = [self.evaluator.evaluate_vector(c) for c in candidates]
        fronts = self.fast_non_dominated_sort(pop_objs)
        
        ranked_candidates = []
        for rank_idx, front in enumerate(fronts, start=1):
            crowd_dist = self.calculate_crowding_distance(front, pop_objs)
            sorted_front = sorted(front, key=lambda idx: crowd_dist[idx], reverse=True)
            
            for idx in sorted_front:
                cand_copy = dict(candidates[idx])
                cand_copy["pareto_rank"] = rank_idx
                cand_copy["crowding_distance"] = round(crowd_dist[idx], 4) if crowd_dist[idx] != float("inf") else 999.0
                cand_copy["objective_vector"] = [round(val, 3) for val in pop_objs[idx]]
                cand_copy["is_pareto_optimal"] = (rank_idx == 1)
                ranked_candidates.append(cand_copy)
                
        return ranked_candidates

    def test_analytical_pareto_benchmark(self) -> dict:
        """
        Verifies NSGA-II sorting against an analytically known Pareto front.
        Known non-dominated points: P1(1, 5), P2(2, 4), P3(3, 3), P4(4, 2), P5(5, 1) -> Rank 1.
        Dominated points: Q1(3, 5) dominated by P3, Q2(4, 4) dominated by P3 -> Rank 2.
        """
        test_points = [
            [1.0, 5.0], [2.0, 4.0], [3.0, 3.0], [4.0, 2.0], [5.0, 1.0], # Front 1
            [3.0, 5.0], [4.0, 4.0]                                       # Front 2
        ]
        fronts = self.fast_non_dominated_sort(test_points)
        
        expected_f1 = {0, 1, 2, 3, 4}
        expected_f2 = {5, 6}
        
        actual_f1 = set(fronts[0]) if len(fronts) > 0 else set()
        actual_f2 = set(fronts[1]) if len(fronts) > 1 else set()
        
        pass_test = (actual_f1 == expected_f1 and actual_f2 == expected_f2)
        
        return {
            "analytical_test_pass": pass_test,
            "rank_1_indices": sorted(list(actual_f1)),
            "rank_2_indices": sorted(list(actual_f2)),
            "num_fronts": len(fronts)
        }
