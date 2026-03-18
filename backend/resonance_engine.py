from math_utils import vortex_mathematics_369, phi_resonance, fibonacci_resonance, PHI

class ResonanceEngine:
    """
    Unified engine to calculate proportional correlation and mathematical resonance.
    Applicable to any attribute or metric in the SGE system.
    """

    def profile_value(self, value: float, label: str = "Metric", reference: float = 360.0) -> dict:
        """
        Create a resonance profile for a specific value.
        Reference is usually 360 for degrees, 24 for hours, etc.
        """
        vortex = vortex_mathematics_369(value)
        phi = phi_resonance(value, reference)
        fib = fibonacci_resonance(value)
        
        # Calculate a total correlation index (0.0 to 1.0)
        # 369 alignment gives a base boost, Phi and Fib add precision
        base_index = 0.5 if vortex["is_369"] else 0.2
        precision_score = (phi * 0.25) + (fib["resonance"] * 0.25)
        correlation_index = min(1.0, base_index + precision_score)
        
        return {
            "label": label,
            "value": round(value, 6),
            "vortex": vortex,
            "phi_score": round(phi, 6),
            "fibonacci": fib,
            "correlation_index": round(correlation_index, 6),
            "is_highly_resonant": correlation_index > 0.8
        }

    def correlate_entities(self, entity_a: dict, entity_b: dict) -> float:
        """Calculate the proportional resonance between two entities' values."""
        val_a = entity_a.get("value", 0)
        val_b = entity_b.get("value", 1) # avoid div by zero
        
        if val_b == 0: return 0.0
        
        # Proportional ratio
        ratio = val_a / val_b
        
        # Check resonance of the ratio itself with PHI
        ratio_phi_score = phi_resonance(ratio, 1.0)
        
        return round(ratio_phi_score, 6)

    def batch_resonance(self, metrics: dict) -> dict:
        """Calculate a summary resonance for a collection of metrics."""
        profiles = {}
        total_index = 0
        
        for key, val in metrics.items():
            # Try to extract latitude/longitude/degree if it's a dict
            numeric_val = val.get("longitude", val.get("value", val)) if isinstance(val, dict) else val
            try:
                profiles[key] = self.profile_value(float(numeric_val), label=key)
                total_index += profiles[key]["correlation_index"]
            except (ValueError, TypeError):
                continue
                
        avg_index = total_index / len(profiles) if profiles else 0
        
        return {
            "profiles": profiles,
            "average_correlation_index": round(avg_index, 6),
            "systemic_harmony": "High" if avg_index > 0.7 else ("Moderate" if avg_index > 0.4 else "Low")
        }
