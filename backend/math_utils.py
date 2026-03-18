import math

PHI = (1 + math.sqrt(5)) / 2  # 1.6180339887...

FIBONACCI_SEQ = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597]

def digital_root(n: float | int) -> int:
    """Calculate the recursive digital root of a number."""
    # Handle decimals by multiplying and treating as integer for root calculation
    # or just use the absolute integer value for simplicity in spiritual math
    s = str(abs(int(round(float(n)))))
    while len(s) > 1:
        s = str(sum(int(digit) for digit in s))
    return int(s)

def is_369(n: float | int) -> bool:
    """Check if the digital root is 3, 6, or 9."""
    root = digital_root(n)
    return root in [3, 6, 9]

def phi_resonance(value: float, reference: float = 1.0) -> float:
    """
    Calculate resonance with the Golden Ratio.
    Returns a score from 0 to 1 based on how close value/reference is to PHI or its powers.
    """
    if reference == 0:
        return 0.0
    
    ratio = abs(value / reference)
    if ratio == 0:
        return 0.0
    
    # Check resonance with PHI^n or PHI^-n
    log_phi = math.log(ratio) / math.log(PHI)
    distance = abs(log_phi - round(log_phi))
    
    # Exponential decay for distance
    return math.exp(-distance * 5)

def fibonacci_resonance(n: float | int) -> dict:
    """Check proximity to the Fibonacci sequence."""
    val = abs(float(n))
    nearest = min(FIBONACCI_SEQ, key=lambda f: abs(f - val))
    distance = abs(val - nearest)
    
    # Resonance is 1.0 if it hits, decays with distance
    resonance = math.exp(-distance / (nearest * 0.1 + 1))
    
    return {
        "nearest": nearest,
        "distance": round(distance, 4),
        "resonance": round(resonance, 6)
    }

def vortex_mathematics_369(n: float | int) -> dict:
    """Full vortex math analysis for a number."""
    root = digital_root(n)
    return {
        "digital_root": root,
        "is_369": root in [3, 6, 9],
        "is_source_9": root == 9,
        "is_polarity_36": root in [3, 6],
        "label": "Source" if root == 9 else ("Polarity" if root in [3, 6] else "Material")
    }
